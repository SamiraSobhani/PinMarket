import React from "react";
import profileIcon from "../../assets/Icons/profile-user.png";
import logo from "../../assets/FinalLogo.svg";
import Pin from "../../assets/pin1.jpg";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import axios from "axios";
function NavHeader(props) {
  const cookies = new Cookies();

  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn == true) {
        cookies.set("name", response.data.user[0].username, { path: "/" });
        return cookies;
      }
    });
  });

  return (
    <div className="navbar">
      <img className="navbar__pin" src={Pin}></img>
      <img src={logo} className="navbar__logo"></img>
      <div className="navbar__profile navbar__active">
        <h2 className="navbar__welcome ">Welcome , {cookies.get("name")}</h2>
        <NavLink to="/">
          <img className="navbar__icon" src={profileIcon} alt="profile"></img>
        </NavLink>
      </div>
    </div>
  );
}

export default NavHeader;
