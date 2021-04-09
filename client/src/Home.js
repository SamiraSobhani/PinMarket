import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "./components/Navbar/NavHeader";
import Modal from "./components/Auth/ModalReg";
import welcomepic from "./assets/welcome.png";
export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  // const [registerStatus, setRegisterStatus] = useState("");
  const history = useHistory();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:8080/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // window.location.reload(true);
        history.push("/posters");
        setLoginStatus(response.data[0].username);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div>
      <Navbar loginStatus={loginStatus} />
      <div className="Home container">
        <Modal />

        <div className="login">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="  Username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="  Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}> Login </button>
        </div>
      </div>
    </div>
  );
}
