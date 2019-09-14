import axios from "axios";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import Header from "../../Containers/Header";
import HomePageNavBar from "../../Containers/HomePageNavbar";
import Navigation from "../../Containers/Navigation";
import Api_Url from "../../Helpers/Api_Url";
import errorHandler from "../../Helpers/ErrorHandler";
import "./Login.css";
import LoginForm from "./LoginForm";

const login = props => {
  const tryLogin = userLoginInfo => {
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
          props.history.push("/Timetracker/admin");
          return;
        }
        if (res.status === 200) {
          props.history.push("/Timetracker/report");
        }
      })
      .catch(error => {
        errorHandler(error.response.data);
      });
  };
  return (
    <div>
      <HomePageNavBar />
      <Header title={"Välkommen till Tidsrapporten!"} />
      <div className="login-div" color="light">
        <LoginForm tryLogin={tryLogin} />
        <Navigation />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};
export default login;
