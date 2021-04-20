import ReactDOM from "react-dom";
import NavHeader from "./components/Navbar/NavHeader";
import React from "react";
import App from "./App";
// import UserPage from "./UserPage";
// import Search from "./Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/pagesStyle/App/main.scss";
import registerServiceWorker from './registerServiceWorker';
// import Login from "./Login";
// import Signup from "./Signup";
// import Home from "./Home";
ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      {/* <NavHeader /> */}
      <Switch>
        <App />
        {/* <Route path="/posters/userpage" component={Home} exact />
        <Route path="/posters/search/:id" component={Search} />
        <Route path="/posters/search" component={Search} />
        <Route path="/posters" component={UserPage} /> */}

        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/signup" component={Signup} /> */}
        {/* <Route path="/" component={Signup} /> */}
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();