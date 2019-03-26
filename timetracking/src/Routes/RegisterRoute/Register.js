import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import "./Register.css";
import RegisterForm from "./RegisterForm";

export default class Register extends React.Component {
  state = {
    error: "",
    success: "",
    title: "Registering",
    subtitle: "Registera dig för att kunna logga in."
  };

  addUser = userRegisterInfo => {
    axios
      .post(`${Api_Url}/auth/register`, {
        login: userRegisterInfo.login,
        password: userRegisterInfo.password,
        firstname: userRegisterInfo.firstname,
        lastname: userRegisterInfo.lastname,
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
      <div className="register-div">
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <RegisterForm
          handleClickOnBackButton={this.handleClickOnBackButton}
          addUser={this.addUser}
        />
        <p className="register-errormsg">{this.state.error}</p>
        <p className="register-successmsg">{this.state.success}</p>
      </div>
    );
  }
}
