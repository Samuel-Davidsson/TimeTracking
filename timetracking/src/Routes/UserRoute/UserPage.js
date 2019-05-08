import React from "react";
import "react-app-polyfill/ie11";
import "react-day-picker/lib/style.css";
import Header from "../../Containers/Header";
import HeaderNavbar from "../../Containers/HomePageNavbar";
import Timereport from "./Timereport";
import "./UserRoute.css";

export default class UserPage extends React.Component {
  state = {
    isAuthorized: true,
    title: "Rapport för"
  };
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  activeReportDate = new Date(this.currentYear, this.currentMonth);
  month = this.activeReportDate.toLocaleString(this.locale, { month: "long" });
  render() {
    return (
      <div>
        <HeaderNavbar isAuthorized={this.state.isAuthorized} />
        <Header title={this.state.title} />
        <Timereport />
      </div>
    );
  }
}
