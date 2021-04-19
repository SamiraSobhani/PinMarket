import React, { Component } from "react";
// import Navbar from "./components/Navbar/NavHeader";
import { Link, Redirect } from "react-router-dom";
import { signup } from "./components/Auth/APIUtils";
import googleLogo from "./assets/google-logo.png";
import Alert from "react-s-alert";
import "./styles/pagesStyle/Signup/_signup.scss";
const API_BASE_URL = "http://localhost:8080";
const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
class Signup extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <div className="signup-container">
        {/* <Navbar /> */}
        <div className="signup-content">
          <h1 className="signup-title">Signup with PinPal</h1>
          <SocialSignup />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <SignupForm {...this.props} />
          <div className="login-link">
            Already have an account? <Link to="/login">Login!</Link>
          </div>
        </div>
      </div>
    );
  }
}

class SocialSignup extends Component {
  render() {
    return (
      <div className="social-signup">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Sign up with Google
        </a>
      </div>
    );
  }
}

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const signUpRequest = Object.assign({}, this.state);

    signup(signUpRequest)
      .then((response) => {
        Alert.success(
          "You're successfully registered. Please login to continue!"
        );
        this.props.history.push("/login");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  render() {
    return (
      <form className="myform" onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder=" Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder=" Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder=" Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default Signup;
