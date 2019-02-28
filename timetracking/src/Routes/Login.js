import React from "react";
import Header from "../Header";
import LoginForm from "../LoginForm";
import Navigation from "../Navigation";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  tryLogin = userLoginInfo => {
    console.log("👻");
    console.log(userLoginInfo);
    //Får ut rätt info här nu
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
