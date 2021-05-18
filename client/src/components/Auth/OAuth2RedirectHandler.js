import React, { Component } from "react";
import { ACCESS_TOKEN } from "../constants";
import { Redirect } from "react-router-dom";

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    let results = regex.exec(this.props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    const token = this.getUrlParameter("token");
    const error = this.getUrlParameter("error");

    if (token) {
      sessionStorage.setItem(ACCESS_TOKEN, token);
      sessionStorage.setItem("_expiredTime", Date.now() + 20 * 1000);
      
      return (
        <Redirect
          to={{
            pathname: "/posters",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: error,
            },
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;
