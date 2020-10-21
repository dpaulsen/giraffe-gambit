import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Layout";

const App = (props) => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Layout} />
    </BrowserRouter>
  );
};

export default App;
