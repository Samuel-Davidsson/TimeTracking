import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Containers/Header";
import HeaderPageNavbar from "../../Containers/HomePageNavbar";
import Api_Url from "../../Helpers/Api_Url";
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
          toast.success(res.data) &
          setTimeout(() => {
            handleClickOnBackButton();
          }, 5000)
        );
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };
  const handleClickOnBackButton = userRegisterInfo => {
    userRegisterInfo = "";
    props.history.push("/timetracker");
  };
  return (
    <div>
      <div className="register-div">
        <HeaderPageNavbar />
        <Header title={"Registreringssida för dig så att du kan logga in."} />
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
