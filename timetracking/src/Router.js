import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Calender from "./Routes/Calender";
import Login from "./Routes/Login";
import NotFound from "./Routes/NotFound";
import Register from "./Routes/Register";

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/calender" component={Calender} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
