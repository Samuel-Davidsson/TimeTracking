import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Navigation from "../../Containers/Navigation";
import AppIcon from "../../Image/timeglass.png";
import "../../scss/login.scss";

const LoginForm = props => {
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
    <Form className="Form" onSubmit={handleSubmit}>
      <h1>Välkommen till Tidsrapporten</h1>
      <img src={AppIcon} alt="Clock" />
      <FormGroup className="FormGroup" row>
        <Label className="Label">Användarnamn:</Label>
        <Input
          className="Input"
          name="username"
          value={login}
          onChange={e => setLogin(e.target.value)}
          type="email"
          required
        />
      </FormGroup>
      <FormGroup className="FormGroup" row>
        <Label className="Label">Lösenord:</Label>
        <Input
          className="Input"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          required
        />
      </FormGroup>
      <div>
        <Button className="Button" size="lg" color="info" type="submit">
          Logga in
        </Button>
      </div>
      <Navigation />
    </Form>
  );
};
export default LoginForm;
