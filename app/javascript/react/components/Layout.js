import React from "react";
import { Route, Switch } from "react-router-dom";
import GiraffesIndexPage from "./GiraffesIndexPage";
import GiraffeNewPage from "./GiraffeNewPage";
import GiraffeShowPage from "./GiraffeShowPage";
import AboutPage from "./AboutPage"
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div className="grid-y medium-grid-frame">
      <div className="cell medium-auto medium-cell-block-container">
        <div className="grid-x" style={{ height: "100%" }}>
          <Navbar classes="cell small-2 navbar" />
          <div className="cell auto medium-cell-block-y">
            <div className="grid-x" style={{ height: "100%" }}>
              <Switch>
                <Route exact path="/" component={GiraffesIndexPage} />
                <Route exact path="/giraffes" component={GiraffesIndexPage} />
                <Route exact path="/giraffes/new" component={GiraffeNewPage} />
                <Route exact path="/giraffes/:id" component={GiraffeShowPage} />
                <Route exact path="/about" component={AboutPage} />
              </Switch>
              <div className="cell small-1 giraffe-neck"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
