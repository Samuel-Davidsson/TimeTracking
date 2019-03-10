import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import Navigation from "../../Navigation";
import "./Login.css";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  state = {
    error: "",
    title: "Välkommen till Tidsrapporten",
    subtitle: "Ett lätt sätt att fylla i månadens tidsrapport"
  };
  tryLogin = userLoginInfo => {
    axios
      .post(`${Api_Url}/auth/login`, {
        login: userLoginInfo.login,
        password: userLoginInfo.password
      })
      .then(res => {
        const data = res.data;
        const { id, token, firstname, lastname } = data;
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        console.log(data);
        if (res.status === 200 && res.data.isAdmin === true) {
          this.props.history.push("/timetracker/admin");
          return;
        }
        if (res.status === 200) {
          this.props.history.push("/timetracker/timereport");
        }
      })
      .catch(error => {
        console.log(error);
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
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <LoginForm tryLogin={this.tryLogin} />
        <div className="navlink-div">
          <Navigation />
        </div>
        <p className="login-errormsg">{this.state.error}</p>
      </div>
    );
  }
}
export default Login;
