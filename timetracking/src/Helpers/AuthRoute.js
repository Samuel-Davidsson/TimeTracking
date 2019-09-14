import React from "react";
import { Redirect, Route } from "react-router-dom";
import CheckAuth from "./CheckAuth";

const authRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/Timetracker/" }} />
      )
    }
  />
);
export default authRoute;
