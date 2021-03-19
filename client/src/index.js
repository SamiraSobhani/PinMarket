import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/main.scss";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
    </React.Fragment>,
  document.getElementById("root")
);
