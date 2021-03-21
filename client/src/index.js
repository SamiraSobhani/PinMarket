import ReactDOM from "react-dom";
import NavHeader from "./components/Navbar/NavHeader";
import React from "react";
import App from "./App";
import UserPage from "./UserPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/main.scss";


ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <NavHeader />
      <Switch>
        <Route path="/posters/userpage" component={UserPage} exact />
        <Route path="/posters" component={App} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
