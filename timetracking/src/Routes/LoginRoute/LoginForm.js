import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Login.css";

const loginForm = props => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const userLoginInfo = {
      login: login,
      password: password
    };
    props.tryLogin(userLoginInfo);
  };
  return (
    <div className="login-form-div">
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup row>
          <Label className="login-form-label">Användarnamn</Label>
          <Input
            name="username"
            value={login}
            onChange={e => setLogin(e.target.value)}
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Lösenord.."
            type="password"
            required
            className="username-password"
          />
        </FormGroup>
        <p className="login-comment">Lätt sätt att fylla i sin tidsrapport.</p>
        <div className="login-button-div">
          <Button color="info" type="submit">
            Logga in
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default loginForm;
