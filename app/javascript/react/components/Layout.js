import React from "react";
import { Route, Switch } from "react-router-dom";
import GiraffesIndexPage from "./GiraffesIndexPage";
import GiraffeNewPage from "./GiraffeNewPage";

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={GiraffesIndexPage} />
      <Route exact path="/giraffes" component={GiraffesIndexPage} />
      <Route exact path="/giraffes/new" component={GiraffeNewPage} />
    </Switch>
  );
};

export default Layout;
