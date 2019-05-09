import axios from "axios";
import React from "react";
import Header from "../../Containers/Header";
import HeaderPageNavbar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
import "./Register.css";
import RegisterForm from "./RegisterForm";

export default class Register extends React.Component {
  state = {
    error: "",
    success: "",
    title: "Registering"
  };

  addUser = userRegisterInfo => {
    axios
      .post(`${Api_Url}/auth/register`, {
        login: userRegisterInfo.login,
        password: userRegisterInfo.password,
        confirmpassword: userRegisterInfo.confirmpassword,
        firstname: userRegisterInfo.firstName,
        lastname: userRegisterInfo.lastName,
        department: userRegisterInfo.department
      })
      .then(res => {
        this.setState({
          success: res.data,
          error: ""
        });
        return setTimeout(() => {
          this.handleClickOnBackButton();
        }, 5000);
      })
      .catch(error => {
        this.setState({ error: error.response.data, success: "" });
        setTimeout(() => {
          this.setState({
            error: ""
          });
        }, 2500);
      });
  };
  handleClickOnBackButton = userRegisterInfo => {
    userRegisterInfo = "";
    this.props.history.push("/timetracker");
  };

  render() {
    return (
      <div>
        <div className="register-div">
          <HeaderPageNavbar />
          <Header
            title={this.state.title}
            isAuthorized={this.state.isAuthorized}
          />
          <RegisterForm
            handleClickOnBackButton={this.handleClickOnBackButton}
            addUser={this.addUser}
            error={this.state.error}
            success={this.state.success}
          />
        </div>
      </div>
    );
  }
}
