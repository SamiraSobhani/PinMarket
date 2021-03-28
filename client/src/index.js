import ReactDOM from "react-dom";
import NavHeader from "./components/Navbar/NavHeader";
import React from "react";
import App from "./App";
import UserPage from "./UserPage";
import Search from "./Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/pagesStyle/App/main.scss";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <NavHeader />
      <Switch>
        <Route path="/posters/userpage" component={App} exact />
        <Route path="/posters/search/:id" component={Search} />
        <Route path="/posters/search" component={Search} />
        <Route path="/posters" component={UserPage} />
        <Route path="/" component={UserPage} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
