import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import Navigation from "../../Navigation";
import "./Login.css";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  loginRef = React.createRef();
  passwordRef = React.createRef();

  tryLogin = userLoginInfo => {
    console.log(userLoginInfo);
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
          this.props.history.push("/admin");
          return;
        }
        if (res.status === 200) {
          this.props.history.push("/timereport");
        }
      });
  };

  render() {
    return (
      <div>
        <Header />
        <LoginForm tryLogin={this.tryLogin} />
        <div className="navlink-div">
          <Navigation />
        </div>
      </div>
    );
  }
}
export default Login;
