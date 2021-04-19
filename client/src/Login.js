// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { useHistory } from "react-router-dom";
// import Navbar from "./components/Navbar/NavHeader";
// import Modal from "./components/Auth/ModalReg";
// import welcomepic from "./assets/welcome.png";
// export default function Registration() {
//   const [usernameReg, setUsernameReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loginStatus, setLoginStatus] = useState("");
//   // const [registerStatus, setRegisterStatus] = useState("");
//   const history = useHistory();

//   Axios.defaults.withCredentials = true;

//   const login = () => {
//     Axios.post("http://localhost:8080/login", {
//       username: username,
//       password: password,
//     }).then((response) => {
//       if (response.data.message) {
//         setLoginStatus(response.data.message);
//       } else {
//         // window.location.reload(true);
//         history.push("/posters");
//         setLoginStatus(response.data[0].username);
//       }
//     });
//   };

//   useEffect(() => {
//     Axios.get("http://localhost:8080/login").then((response) => {
//       console.log(response);
//       if (response.data.loggedIn == true) {
//         setLoginStatus(response.data.user[0].username);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <Navbar loginStatus={loginStatus} />
//       <div className="Home container">
//         <Modal />

//         <div className="login">
//           <h1>Login</h1>
//           <input
//             type="text"
//             placeholder="  Username..."
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//           />
//           <input
//             type="password"
//             placeholder="  Password..."
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button onClick={login}> Login </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { Component } from "react";
// import './Login.css';
import { login } from "./components/Auth/APIUtils";

import { Link, Redirect } from "react-router-dom";

import googleLogo from "./assets/google-logo.png";

import Alert from "react-s-alert";
const ACCESS_TOKEN = "accessToken";
const API_BASE_URL = "http://localhost:8080";
const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
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
            pathname: "/",
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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
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

    const loginRequest = Object.assign({}, this.state);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        Alert.success("You're successfully logged in!");
        this.props.history.push("/");
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
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
