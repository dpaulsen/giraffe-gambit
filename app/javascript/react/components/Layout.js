import React from "react";
import { Route, Switch } from "react-router-dom";
import GiraffesIndexPage from "./GiraffesIndexPage";
import GiraffeNewPage from "./GiraffeNewPage";
import GiraffeShowPage from "./GiraffeShowPage";

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={GiraffesIndexPage} />
      <Route exact path="/giraffes" component={GiraffesIndexPage} />
      <Route exact path="/giraffes/new" component={GiraffeNewPage} />
      <Route exact path="/giraffes/:id" component={GiraffeShowPage} />
    </Switch>
  );
};

export default Layout;
