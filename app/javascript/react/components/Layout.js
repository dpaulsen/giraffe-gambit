import React from "react";
import { Route, Switch } from "react-router-dom";
import GiraffesIndexPage from "./GiraffesIndexPage";

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={GiraffesIndexPage} />
      <Route exact path="/giraffes" component={GiraffesIndexPage} />
    </Switch>
  );
};

export default Layout;
