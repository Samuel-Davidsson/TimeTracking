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
      <div className="div-loginform">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Användarnamn</Label>
            <Input
              name="username"
              innerRef={this.loginRef}
              placeholder="Användarnamn.."
              type="email"
              className="login-input"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Lösenord</Label>
            <Input
              name="password"
              innerRef={this.passwordRef}
              placeholder="Lösenord.."
              type="password"
              className="login-input"
              required
            />
          </FormGroup>
          <Button color="info" size="lg" type="submit">
            Logga in
          </Button>{" "}
        </Form>
      </div>
    );
  }
}
export default LoginForm;
