import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "../Helpers/AuthRoute";
import AdminPage from "../Routes/AdminRoute/AdminPage";
import Login from "../Routes/LoginRoute/Login";
import NotFound from "../Routes/NotFound";
import Register from "../Routes/RegisterRoute/Register";
import UserPage from "../Routes/UserRoute/UserPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Tidsrapporten" exact component={Login} />
      <Route path="/Tidsrapporten/login" component={Login} />
      <Route path="/Tidsrapporten/registrera" component={Register} />
      <AuthRoute path="/Tidsrapporten/rapport" component={UserPage} />
      <AuthRoute path="/Tidsrapporten/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default React.memo(Router);
