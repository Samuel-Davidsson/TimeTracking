import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Login.css";

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
  };
  render() {
    return (
      <div className="login-form-div">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label className="login-form-label">Användarnamn</Label>
            <Input
              name="username"
              innerRef={this.loginRef}
              placeholder="Användarnamn.."
              type="email"
              required
              className="username-username"
            />
          </FormGroup>
          <FormGroup row>
            <Label className="login-form-label">Lösenord</Label>
            <Input
              name="password"
              innerRef={this.passwordRef}
              placeholder="Lösenord.."
              type="password"
              required
              className="username-password"
            />
          </FormGroup>
          <div className="login-button-div">
            <Button color="info" type="submit">
              Logga in
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default LoginForm;
