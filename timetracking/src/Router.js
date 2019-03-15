import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./Helpers/AuthRoute";
import Admin from "./Routes/Admin";
import Login from "./Routes/LoginRoute/Login";
import NotFound from "./Routes/NotFound";
import Register from "./Routes/RegisterRoute/Register";
import UserPage from "./Routes/UserRoute/UserPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Timetracker" exact component={Login} />
      <Route path="/Timetracker/login" component={Login} />
      <Route path="/Timetracker/register" component={Register} />
      <AuthRoute path="/Timetracker/timereport" component={UserPage} />
      <Route path="/Timetracker/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
