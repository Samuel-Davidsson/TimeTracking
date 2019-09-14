import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Navigation from "../../Containers/Navigation";
import "./Login.css";

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
    <Grid className="grid">
      <form className="test" onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Användarnamn"
          value={login}
          onChange={e => setLogin(e.target.value)}
          type="email"
          fullWidth
        />
        <TextField
          name="password"
          label="Lösenord"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          fullWidth
        />
        <div className="button">
          <Navigation />
          <Button color="primary" type="submit" variant="contained">
            Logga in
          </Button>
        </div>
      </form>
    </Grid>
  );
};
export default LoginForm;
