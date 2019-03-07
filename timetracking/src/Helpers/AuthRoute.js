import React from "react";
import { Redirect, Route } from "react-router-dom";
import CheckAuth from "./CheckAuth";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/timereport" }} />
      )
    }
  />
);
export default AuthRoute;
