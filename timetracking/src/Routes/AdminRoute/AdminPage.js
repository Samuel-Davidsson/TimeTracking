import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import HomePageNavBar from "../../HomePageNavbar";
import "./Admin.css";
import UserActiveReport from "./UserActiveReport";
import Userlist from "./Userlist";

export default class AdminPage extends React.Component {
  state = {
    title: "Admin sidan",
    subtitle: "",
    users: [],
    report: ""
  };

  handleCheckBoxClicked = event => {
    this.setState({ attest: event.target.checked });
  };

  reportUserInfo = userInfo => {
    axios
      .get(`${Api_Url}/user/` + userInfo.id, {
        headers: GenerateHeaderData()
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        const deviationItems = data.deviationItems;
        const totalHours = 0;
        if (deviationItems !== null) {
          deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
          const totalHours = TotalHoursCount(
            deviationItems.map(x => Number(x.hours))
          );
          this.setState({
            report: data,
            firstName: data.firstName,
            lastName: data.lastName,
            attest: data.attest,
            totalHours: totalHours
          });
        } else {
          this.setState({
            report: data,
            firstName: data.firstName,
            lastName: data.lastName,
            attest: data.attest,
            totalHours: totalHours
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

  render() {
    return (
      <div>
        <HomePageNavBar />
        <Header title={this.state.title} />
        <Userlist
          users={this.state.users}
          reportUserInfo={this.reportUserInfo}
        />
        <UserActiveReport
          month={this.monthName}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          totalHours={this.state.totalHours}
          attest={this.state.attest}
          handleCheckBoxClicked={this.handleCheckBoxClicked}
        />
      </div>
    );
  }
}
