import axios from "axios";
import React from "react";
import "../../App.css";
import Header from "../../Containers/Header";
import Api_Url from "../../Helpers/Api_Url";
import Error from "../../Helpers/Error";
import HomePageNavBar from "../../Containers/HomePageNavbar";
import Navigation from "../../Containers/Navigation";
import "./Login.css";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  state = {
    error: "",
    title: "Välkommen till Timetrackern!"
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
        <HomePageNavBar />
        <Header
          title={this.state.title}
          isAuthorized={this.state.isAuthorized}
        />
        <div className="login-div" color="light">
          <LoginForm tryLogin={this.tryLogin} />
          <Navigation />
          <Error error={this.state.error} />
        </div>
      </div>
    );
  }
}
export default Login;
