import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import Error from "../../Helpers/Error";
import HomePageNavBar from "../../HomePageNavbar";
import Navigation from "../../Navigation";
import "./Login.css";
import "../../App.css";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  state = {
    error: "",
    title: "Välkommen till Timetrackern!",
    subtitle: "Ett lätt sätt att fylla i månadens tidsrapport.",
    isAuthorized: false
  };
  tryLogin = userLoginInfo => {
    axios
      .post(`${Api_Url}/auth/login`, {
        login: userLoginInfo.login,
        password: userLoginInfo.password
      })
      .then(res => {
        const data = res.data;
        const { id, token, firstname, lastname, expirationTime } = data;
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("expirationTime", expirationTime);
        if (res.status === 200 && res.data.isAdmin === true) {
          this.props.history.push("/timetracker/admin");
          return;
        }
        if (res.status === 200) {
          this.props.history.push("/timetracker/report");
        }
      })
      .catch(error => {
        if (error.response === undefined)
          return this.setState({
            error: "Servern är otillgänglig"
          });
        this.setState({
          error: error.response.data
        });
        setTimeout(() => {
          this.setState({
            error: ""
          });
        }, 5000);
      });
  };

  render() {
    return (
      <div>
        <HomePageNavBar isAuthorized={this.state.isAuthorized} />
        <div>
          <Header title={this.state.title} subtitle={this.state.subtitle} />
          <div className="login-div" color="light">
            <LoginForm tryLogin={this.tryLogin} />
            <Navigation />
            <Error errormsg={this.state.error} />
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
