import axios from "axios";
import "moment/locale/sv";
import React from "react";
import "react-app-polyfill/ie11";
import "react-day-picker/lib/style.css";
import { ToastContainer } from "react-toastify";
import HeaderNavbar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
import CanSubmit from "../../Helpers/CanSubmit";
import ConvertDeviations from "../../Helpers/ConvertDeviations";
import errorHandler from "../../Helpers/ErrorHandler";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import successHandler from "../../Helpers/SuccessHandler";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import Report from "./Report";
import "./UserRoute.css";

class UserPage extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    existingDevitations: [],
    totalHours: 0,
    month: new Date(),
    isValidMonth: true,
    isAuthorized: true,
    isAdmin: false,
    locale: "sv"
  };

  componentDidMount = () => {
    const userId = localStorage.getItem("id");
    axios
      .get(`${Api_Url}/user/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        if (
          res.data.deviationItems === undefined ||
          res.data.deviationItems === null
        )
          return false;
        const existingDevitations = ConvertDeviations(res.data.deviationItems);
        res.data.deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        const totalHours = TotalHoursCount(
          res.data.deviationItems.map(x => Number(x.hours))
        );
        this.setState({
          deviationItems: res.data.deviationItems,
          existingDevitations: existingDevitations,
          report: res.data,
          attest: res.data.attest,
          isLoading: false,
          totalHours: totalHours
        });
      })
      .catch(error => {
        errorHandler(error.response.data);
      });
  };

  handleDeviationClicked = deviationItems => {
    let totalHours = TotalHoursCount(deviationItems.map(x => Number(x.hours)));
    this.totalHours = totalHours;
    this.setState({
      deviationItems: deviationItems,
      totalHours: totalHours
    });
  };
  handleMonthOrYearClicked = month => {
    this.setState({
      month: month
    });
  };
  getReportForYearAndMonth = data => {
    if (data === null) {
      this.setState({
        deviationItems: [],
        isValidMonth: false,
        report: [],
        totalHours: 0
      });
    } else {
      const validMonth = data.date;
      const parsedValidMonth = new Date(validMonth);
      let isValidMonth = CanSubmit(parsedValidMonth, data.accepted);
      const totalHours = TotalHoursCount(
        data.deviationItems.map(x => Number(x.hours))
      );
      this.setState({
        report: data,
        deviationItems: data.deviationItems,
        isValidMonth: isValidMonth,
        totalHours: totalHours
      });
    }
  };

  handleDescriptionChange = (event, deviationItem) => {
    this.setState([(deviationItem.description = event.target.value)]);
  };
  handleHoursChange = (event, deviationItem) => {
    this.setState([(deviationItem.hours = event.target.value)]);
    const totalHours = TotalHoursCount(
      this.state.deviationItems.map(x => Number(x.hours))
    );
    this.setState({ totalHours: totalHours });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        `${Api_Url}/report/addreport`,
        {
          id: this.state.report.id,
          deviationItems: this.state.deviationItems,
          userId: localStorage.getItem("id"),
          currentMonth: this.state.month
        },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        if (res.status === 200)
          res.data.deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
        const existingDevitations = ConvertDeviations(res.data.deviationItems);
        this.setState({
          deviationItems: res.data.deviationItems,
          report: res.data,
          existingDevitations: existingDevitations
        });
        successHandler();
      })
      .catch(error => {
        errorHandler(error.response.data);
      });
  };
  render() {
    return (
      <div>
        <HeaderNavbar isAuthorized={this.state.isAuthorized} />
        <ToastContainer position="top-right" autoClose={5000} />
        <Report
          deviationItems={this.state.deviationItems}
          report={this.state.report}
          month={new Date(this.state.month)}
          locale={this.state.locale}
          isValidMonth={this.state.isValidMonth}
          totalHours={this.state.totalHours}
          attest={this.state.report.attest}
          accepted={this.state.report.accepted}
          handleDayClick={this.handleDayClick}
          handleDeviationClicked={this.handleDeviationClicked}
          existingDevitations={this.state.existingDevitations}
          handleMonthOrYearClicked={this.handleMonthOrYearClicked}
          getReportForYearAndMonth={this.getReportForYearAndMonth}
          handleDescriptionChange={this.handleDescriptionChange}
          handleHoursChange={this.handleHoursChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
export default UserPage;
