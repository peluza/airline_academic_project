import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Consult from "../pages/Consult";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Consult" component={Consult} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
