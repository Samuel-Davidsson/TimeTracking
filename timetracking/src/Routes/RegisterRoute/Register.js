import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import "./Register.css";
import RegisterForm from "./RegisterForm";

export default class Register extends React.Component {
  state = {
    error: "",
    success: ""
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
        console.log(res);
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
          debugger;
          this.setState({
            error: ""
          });
        }, 2500);
      });
  };
  handleClickOnBackButton = userRegisterInfo => {
    userRegisterInfo = 0;
    this.props.history.push("/timetracker");
  };

  render() {
    return (
      <div className="register-div">
        <Header />
        <RegisterForm
          handleClickOnBackButton={this.handleClickOnBackButton}
          addUser={this.addUser}
        />
        <p className="test">{this.state.error}</p>
        <p className="test2">{this.state.success}</p>
      </div>
    );
  }
}
