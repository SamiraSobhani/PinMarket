import React, { Component } from "react";
import { login } from "./components/Auth/APIUtils";
import { Link, Redirect } from "react-router-dom";
import googleLogo from "./assets/google-logo.png";
import Alert from "react-s-alert";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "./components/constants";
import { FormErrors } from "./FormErrors";

class Login extends Component {
  componentDidMount() {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        Alert.error(this.props.location.state.error, {
          timeout: 5000,
        });
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }

  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/posters",
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to PinPal</h1>
          <SocialLogin />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <LoginForm {...this.props} />
          <div className="signup-link">
            New user? <Link to="/signup">Sign up!</Link>
          </div>
        </div>
      </div>
    );
  }
}

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
      </div>
    );
  }
}

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    recaptchaToken: "",
    errors: {},
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.setState(
      {
        [inputName]: inputValue,
      },
      () => {
        this.validateField(inputName, inputValue);
      }
    );
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 5;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  getToken = (loginRequest) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute("6Lf7NLQaAAAAAAaI7qc3hNIB75a_3c7cpBMailtg", {
          action: "submit",
        })
        .then(function (token) {
          // Send form value as well as token to the server
          login(loginRequest, token)
            .then((response) => {
              sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
              Alert.success("You're successfully logged in!");
              this.props.history.push("/posters");
            })

            .catch((error) => {
              error;
            });
        });
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    try {
      const loginRequest = Object.assign({}, this.state);
      console.log("inside handlesubmit function2");
      const recaptchaToken = this.getToken(loginRequest);
      console.log("inside handlesubmit function3", recaptchaToken);
    } catch (ex) {
      console.log("inside handlesubmit function4");
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form className="myform" onSubmit={this.handleSubmit}>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
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
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.password
              )}`}
            >
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
              <button
                data-action="submit"
                type="submit"
                className="btn btn-block btn-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;