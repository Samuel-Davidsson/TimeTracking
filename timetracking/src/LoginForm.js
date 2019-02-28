import React from "react";

class LoginForm extends React.Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  tryLogin = event => {
    event.preventDefault();
    const userLoginInfo = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value
    };
    this.props.tryLogin(userLoginInfo);
    //Osäker på om jag vill resetta efter en failed login..
    event.currentTarget.reset();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.tryLogin}>
          <input
            name="username"
            ref={this.usernameRef}
            placeholder="Användarnamn.."
            type="email"
            required
          />
          <input
            name="password"
            ref={this.passwordRef}
            placeholder="Lösenord.."
            type="password"
            required
          />
          <input type="submit" value="Logga in" />
        </form>
      </div>
    );
  }
}
export default LoginForm;
