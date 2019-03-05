import React from "react";

class LoginForm extends React.Component {
  loginRef = React.createRef();
  passwordRef = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const userLoginInfo = {
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value
    };
    this.props.tryLogin(userLoginInfo);
    event.currentTarget.reset();
  };
  render() {
    return (
      <div className="div-loginform">
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            ref={this.loginRef}
            placeholder="Användarnamn.."
            className="loginform-input-username"
            type="email"
            required
          />
          <input
            name="password"
            ref={this.passwordRef}
            placeholder="Lösenord.."
            className="loginform-input-password"
            type="password"
            required
          />
          <input className="loginform-button" type="submit" value="Logga in" />
        </form>
      </div>
    );
  }
}
export default LoginForm;
