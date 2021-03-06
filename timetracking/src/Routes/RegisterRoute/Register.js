import axios from "axios";
import React from "react";
import { ToastContainer } from "react-toastify";
import HeaderPageNavbar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
import errorHandler from "../../Helpers/ErrorHandler";
import successHandler from "../../Helpers/SuccessHandler";
import "./Register.css";
import RegisterForm from "./RegisterForm";

const register = props => {
  const addUser = userRegisterInfo => {
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
        return (
          successHandler(res.data) &
          setTimeout(() => {
            handleClickOnBackButton();
          }, 5000)
        );
      })
      .catch(error => {
        errorHandler(error.response.data);
      });
  };
  const handleClickOnBackButton = userRegisterInfo => {
    userRegisterInfo = "";
    props.history.push("/Tidsrapporten");
  };
  return (
    <div>
      <div className="register-div">
        <HeaderPageNavbar />
        <ToastContainer position="top-right" autoClose={5000} />
        <RegisterForm
          handleClickOnBackButton={handleClickOnBackButton}
          addUser={addUser}
        />
      </div>
    </div>
  );
};
export default register;
