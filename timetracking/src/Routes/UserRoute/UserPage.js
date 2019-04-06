import React from "react";
import "react-app-polyfill/ie11";
import "react-day-picker/lib/style.css";
import Header from "../../Header";
import HomePageNavBar from "../../HomePageNavbar";
import Timereport from "./Timereport";
import "./UserRoute.css";

export default class UserPage extends React.Component {
  state = {
    subtitle: "Fyll i din frånvaro här senast den sista dagen varje månad",
    isAuthorized: true
  };
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  activeReportDate = new Date(this.currentYear, this.currentMonth);
  month = this.activeReportDate.toLocaleString(this.locale, { month: "long" });
  render() {
    return (
      <div>
        <HomePageNavBar isAuthorized={this.state.isAuthorized} />
        <Header month={this.month} subtitle={this.state.subtitle} />
        <Timereport />
      </div>
    );
  }
}
