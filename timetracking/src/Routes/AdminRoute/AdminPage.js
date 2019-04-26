import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import HomePageNavBar from "../../HomePageNavbar";
import DeviationList from "../../Routes/UserRoute/DeviationList";
import "./Admin.css";
import UserActiveReport from "./UserActiveReport";
import UserHistory from "./UserHistory";
import Userlist from "./Userlist";

export default class AdminPage extends React.Component {
  state = {
    users: [],
    reports: [],
    firstName: "",
    lastName: "",
    report: "",
    isAuthorized: true,
    deviationItems: [],
    totalHours: 0
  };

  reportHistoryInfo = userHistoryInfo => {
    axios
      .post(
        `${Api_Url}/admin/getuserhistory`,
        {
          id: userHistoryInfo.id,
          firstName: userHistoryInfo.firstName,
          lastName: userHistoryInfo.lastName
        },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        const data = res.data;
        if (data.report === null) {
          this.setState({
            deviationItems: [],
            totalHours: 0,
            reports: data.reports,
            firstName: data.firstname,
            lastName: data.lastname
          });
        } else {
          const deviationItems = res.data.report.deviationItems;
          deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
          this.setState({
            deviationItems: deviationItems,
            reports: data.reports,
            firstName: data.firstname,
            lastName: data.lastname
          });
        }
      });
  };

  reportUserInfo = userInfo => {
    axios
      .get(`${Api_Url}/user/` + userInfo.id, {
        headers: GenerateHeaderData()
      })
      .then(res => {
        const deviationItems = res.data.deviationItems;
        if (deviationItems === undefined) return false;
        if (deviationItems === null) {
          this.setState({
            deviationItems: [],
            report: res.data,
            isLoading: false,
            totalHours: 0,
            firstName: res.data.firstName,
            lastName: res.data.lastName
          });
        } else {
          this.totalHours = res.data.hours;
          deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
          this.totalHours = TotalHoursCount(
            deviationItems.map(x => Number(x.hours))
          );
          this.setState({
            deviationItems: deviationItems,
            report: res.data,
            isLoading: false,
            totalHours: this.totalHours,
            firstName: res.data.firstName,
            lastName: res.data.lastName
          });
        }
      });
  };
  componentDidMount = () => {
    const userId = localStorage.getItem("id");
    axios
      .get(`${Api_Url}/admin/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        this.setState({
          users: res.data
        });
      });
  };

  handleCheckBoxClicked = event => {
    this.setState({ attest: event.target.checked });
  };

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  activeReportDate = new Date(this.currentYear, this.currentMonth);
  month = this.activeReportDate.toLocaleString(this.locale, { month: "long" });
  render() {
    return (
      <div>
        <HomePageNavBar isAuthorized={this.state.isAuthorized} />
        <Header month={this.month} />
        <div className="main-div-test">
          <Userlist
            users={this.state.users}
            reportUserInfo={this.reportUserInfo}
            reportHistoryInfo={this.reportHistoryInfo}
          />
          <div className="userhistory-div">
            <UserHistory
              reports={this.state.reports}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
          </div>
          <div className="useractivereport-secondary-div">
            <UserActiveReport
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              totalHours={this.state.totalHours}
              attest={this.state.attest}
              handleCheckBoxClicked={this.handleCheckBoxClicked}
            />
            <DeviationList deviationItems={this.state.deviationItems} />
          </div>
        </div>
      </div>
    );
  }
}
