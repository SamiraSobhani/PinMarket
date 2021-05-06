import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/pagesStyle/App/main.scss";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
