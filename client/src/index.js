import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/pagesStyle/App/main.scss";
import registerServiceWorker from "./registerServiceWorker";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// const YourReCaptchaComponent = () => {
//   const { executeRecaptcha } = useGoogleReCaptcha();
//   const token = executeRecaptcha("login_page");

//   return;
// };
ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      {/* <GoogleReCaptchaProvider reCaptchaKey={process.env.CLIENT_SITE_KEY}>
        <YourReCaptchaComponent />
      </GoogleReCaptchaProvider> */}
      ,
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
