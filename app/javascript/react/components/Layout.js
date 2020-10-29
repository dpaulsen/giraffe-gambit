import React from "react";
import { Route, Switch } from "react-router-dom";
import GiraffesIndexPage from "./GiraffesIndexPage";
import GiraffeNewPage from "./GiraffeNewPage";
import GiraffeShowPage from "./GiraffeShowPage";
import Navbar from "./Navbar"

const Layout = (props) => {
  return (
    <div className="grid-x grid-padding-x">
      <Navbar classes="cell small-2 navbar"/>
      <Switch className="cell auto">
        <Route exact path="/" component={GiraffesIndexPage} />
        <Route exact path="/giraffes" component={GiraffesIndexPage} />
        <Route exact path="/giraffes/new" component={GiraffeNewPage} />
        <Route exact path="/giraffes/:id" component={GiraffeShowPage} />
      </Switch>
    </div>
  );
};

export default Layout;
