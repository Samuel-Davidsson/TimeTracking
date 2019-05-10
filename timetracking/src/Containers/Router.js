import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "../Helpers/AuthRoute";
import AdminPage from "../Routes/AdminRoute/AdminPage";
import Login from "../Routes/LoginRoute/Login";
import NotFound from "../Routes/NotFound";
import Register from "../Routes/RegisterRoute/Register";
import UserPage from "../Routes/UserRoute/UserPage";

const router = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/Timetracker" exact component={Login} />
        <Route path="/Timetracker/login" component={Login} />
        <Route path="/Timetracker/register" component={Register} />
        <AuthRoute path="/Timetracker/report" component={UserPage} />
        <AuthRoute path="/Timetracker/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default React.memo(router);
