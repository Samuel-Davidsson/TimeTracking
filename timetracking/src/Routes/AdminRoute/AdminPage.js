import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Containers/Header";
import HomePageNavBar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
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
      })
      .catch(error => {
        toast.error(error.response.data);
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
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  reportUserInfo = userInfo => {
    axios
      .get(`${Api_Url}/user/` + userInfo.id, {
        headers: GenerateHeaderData()
      })
      .then(res => {
        if (res.data.deviationItems === undefined) return false;
        if (res.data.deviationItems === null) {
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
          res.data.deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
          const totalHours = TotalHoursCount(
            res.data.deviationItems.map(x => Number(x.hours))
          );
          const month = new Date(res.data.date);
          this.setState({
            deviationItems: res.data.deviationItems,
            report: res.data,
            isLoading: false,
            totalHours: totalHours,
            accepted: res.data.accepted,
            attest: res.data.attest,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            month: month
          });
        }
      })
      .catch(error => {
        toast.error(error.response.data);
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
    console.log(
      "💎 Time to build this next remeber to implement success and error handeling"
    );
  };

  handleGetReportByReportId = reportId => {
    axios
      .get(`${Api_Url}/report/` + reportId, {
        headers: GenerateHeaderData()
      })
      .then(res => {
        res.data.deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        const totalHours = TotalHoursCount(
          res.data.deviationItems.map(x => Number(x.hours))
        );
        const month = new Date(res.data.date);
        this.setState({
          report: res.data,
          deviationItems: res.data.deviationItems,
          isLoading: false,
          totalHours: totalHours,
          attest: res.data.attest,
          accepted: res.data.accepted,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          month: month
        });
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <HomePageNavBar isAuthorized={this.state.isAuthorized} />
        <Header />
        <ToastContainer position="top-right" autoClose={5000} />
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
        <div
          className="useractivereport-div"
          hidden={this.state.report.id === 0 || this.state.report === ""}
        >
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
