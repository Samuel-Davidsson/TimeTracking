import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
            <Label>Email</Label>
            <Input
              name="username"
              ref={this.loginRef}
              placeholder="Användarnamn.."
              type="email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Lösenord</Label>
            <Input
              name="password"
              ref={this.passwordRef}
              placeholder="Lösenord.."
              type="password"
              required
            />
          </FormGroup>

          <Button color="info" type="submit">
            Logga in
          </Button>
        </Form>
      </div>
    );
  }
}
export default LoginForm;
