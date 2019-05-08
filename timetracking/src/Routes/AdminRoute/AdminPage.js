import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import Header from "../../Containers/Header";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import HomePageNavBar from "../../Containers/HomePageNavbar";
import DeviationList from "../UserRoute/Devations/DeviationList";
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
    attest: false,
    accepted: false,
    isAuthorized: true,
    deviationItems: [],
    totalHours: 0,
    month: new Date()
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
          this.setState({
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
            reports: [],
            isLoading: false,
            totalHours: 0,
            attest: res.data.attest,
            accepted: res.data.accepted,
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
          const month = new Date(res.data.date);
          this.setState({
            deviationItems: deviationItems,
            report: res.data,
            isLoading: false,
            totalHours: this.totalHours,
            attest: res.data.attest,
            accepted: res.data.accepted,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            month: month
          });
        }
      });
  };
  handleAttestCheckBoxStatus = event => {
    this.setState({
      attest: event.target.checked
    });
  };

  handleAcceptedCheckBoxStatus = event => {
    this.setState({ accepted: event.target.checked });
  };

  handleCheckboxesSubmit = event => {
    event.preventDefault();
    console.log("💎 nice both are now TRUE if I check them");
  };

  handleGetReportByReportId = reportId => {
    axios
      .get(`${Api_Url}/report/` + reportId, {
        headers: GenerateHeaderData()
      })
      .then(res => {
        this.totalHours = res.data.hours;
        res.data.deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        this.totalHours = TotalHoursCount(
          res.data.deviationItems.map(x => Number(x.hours))
        );
        const month = new Date(res.data.date);
        this.setState({
          report: res.data,
          deviationItems: res.data.deviationItems,
          isLoading: false,
          totalHours: this.totalHours,
          attest: res.data.attest,
          accepted: res.data.accepted,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          month: month
        });
      });
  };

  render() {
    return (
      <div>
        <HomePageNavBar isAuthorized={this.state.isAuthorized} />
        <Header />
        <div className="userlist-div">
          <Userlist
            users={this.state.users}
            reportUserInfo={this.reportUserInfo}
            reportHistoryInfo={this.reportHistoryInfo}
          />
        </div>
        <div className="userhistory-div">
          <UserHistory
            reports={this.state.reports}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            handleGetReportByReportId={this.handleGetReportByReportId}
          />
        </div>
        <div className="useractivereport-div">
          <UserActiveReport
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            totalHours={this.state.totalHours}
            attest={this.state.attest}
            accepted={this.state.accepted}
            report={this.state.report}
            handleCheckBoxClicked={this.handleCheckBoxClicked}
            handleAttestCheckBoxStatus={this.handleAttestCheckBoxStatus}
            handleAcceptedCheckBoxStatus={this.handleAcceptedCheckBoxStatus}
            handleCheckboxesSubmit={this.handleCheckboxesSubmit}
          />
          <DayPicker
            selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
            month={this.state.month}
            canChangeMonth={false}
          />
          <DeviationList deviationItems={this.state.deviationItems} />
        </div>
      </div>
    );
  }
}
