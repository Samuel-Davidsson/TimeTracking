import axios from "axios";
import React from "react";
import Header from "../Header";
import Api_Url from "../Helpers/Api_Url";
import LoginForm from "../LoginForm";
import Navigation from "../Navigation";

class Login extends React.Component {
  tryLogin = userLoginInfo => {
    console.log(userLoginInfo);
    axios
      .post(`${Api_Url}/auth/login`, {
        login: userLoginInfo.login,
        password: userLoginInfo.password
      })
      .then(res => {
        const data = res.data;
        console.log(data);
      });
  };
  render() {
    return (
      <div className="login-style">
        <Header />
        <LoginForm tryLogin={this.tryLogin} />
        <Navigation />
      </div>
    );
  }
}
export default Login;
