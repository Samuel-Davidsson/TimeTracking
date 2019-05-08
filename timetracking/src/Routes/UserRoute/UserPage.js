import axios from "axios";
import "moment/locale/sv";
import React from "react";
import "react-app-polyfill/ie11";
import "react-day-picker/lib/style.css";
import Header from "../../Containers/Header";
import HeaderNavbar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
import CanSubmit from "../../Helpers/CanSubmit";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import DeviationList from "./Devations/DeviationList";
import MainUserInfo from "./MainUserInfo";
import Report from "./Report";
import "./UserRoute.css";

export default class UserPage extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    existingDevitations: [],
    totalHours: 0,
    month: new Date(),
    isValidMonth: true,
    isAdmin: false,
    success: "",
    error: "",
    locale: "sv"
  };
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  componentDidMount = () => {
    const userId = localStorage.getItem("id");
    axios
      .get(`${Api_Url}/user/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        const deviationItems = res.data.deviationItems;
        const { id } = res.data;
        const existingDevitations = [];
        if (deviationItems === undefined) return false;
        res.data.deviationItems.forEach(element => {
          existingDevitations.push({
            reportId: element.reportId,
            id: element.id,
            hours: element.hours,
            absenceDate: element.absenceDate,
            description: element.description
          });
        });
        existingDevitations.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        localStorage.setItem("reportId", id);
        deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        const totalHours = TotalHoursCount(
          deviationItems.map(x => Number(x.hours))
        );
        this.setState({
          deviationItems: deviationItems,
          existingDevitations: existingDevitations,
          report: res.data,
          isLoading: false,
          totalHours: totalHours
        });
      });
  };

  handleDeviationClicked = deviationItems => {
    console.log(deviationItems);
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
    console.log(data);
    if (data === null) {
      this.setState({ deviationItems: [], isValidMonth: false });
    } else {
      const validMonth = data.date;
      const parsedValidMonth = new Date(validMonth);
      const isValidMonth = CanSubmit(parsedValidMonth);
      const totalHours = TotalHoursCount(
        data.deviationItems.map(x => Number(x.hours))
      );
      this.setState({
        report: data,
        deviationItems: data.deviationItems,
        isValidMonth: isValidMonth,
        error: "",
        totalHours: totalHours
      });
    }
  };
  handleDescriptionChange = (event, deviationItem) => {
    this.setState([(deviationItem.description = event.target.value)]);
  };

  handleHoursChange = (event, deviationItem) => {
    this.setState([(deviationItem.hours = event.target.value)]);
    this.totalHours = TotalHoursCount(
      this.state.deviationItems.map(x => Number(x.hours))
    );
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
        const deviationItems = res.data.deviationItems;
        const existingDevitations = [];
        if (res.status === 200)
          deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
        deviationItems.forEach(element => {
          existingDevitations.push({
            reportId: element.reportId,
            id: element.id,
            hours: element.hours,
            absenceDate: element.absenceDate,
            description: element.description
          });
        });
        this.setState({
          success: "Uppgifterna har sparats/updaterats.",
          deviationItems: deviationItems,
          report: res.data,
          existingDevitations: existingDevitations
        });
        setTimeout(() => {
          this.setState({
            success: ""
          });
        }, 5000);
      });
  };
  render() {
    return (
      <div>
        <HeaderNavbar isAuthorized={this.state.isAuthorized} />
        <Header title={this.state.title} />
        <Report
          deviationItems={this.state.deviationItems}
          report={this.state.report}
          month={new Date(this.state.month)}
          locale={this.state.locale}
          handleDayClick={this.handleDayClick}
          handleDeviationClicked={this.handleDeviationClicked}
          existingDevitations={this.state.existingDevitations}
          handleMonthOrYearClicked={this.handleMonthOrYearClicked}
          getReportForYearAndMonth={this.getReportForYearAndMonth}
          isValidMonth={this.state.isValidMonth}
        />
        <div className="timereport-main-div">
          <p className="user-comment">
            Fyll i din frånvaro här senast den sista dagen varje månad!
          </p>
          <MainUserInfo
            firstName={this.firstName}
            lastName={this.lastName}
            totalHours={this.state.totalHours}
            attest={this.state.report.attest}
            handleCheckBoxClicked={this.state.handleCheckBoxClicked}
          />
          {/* <div>
            <Error error={this.state.error} />
            <Success success={this.state.success} />
          </div> */}
          <DeviationList
            deviationItems={this.state.deviationItems}
            handleDescriptionChange={this.handleDescriptionChange}
            handleHoursChange={this.handleHoursChange}
            handleSubmit={this.handleSubmit}
            isValidMonth={this.state.isValidMonth}
          />
        </div>
      </div>
    );
  }
}
