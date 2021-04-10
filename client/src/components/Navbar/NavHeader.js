import React from "react";
import profileIcon from "../../assets/Icons/profile-user.png";
import logo from "../../assets/Capture.PNG";
import Pin from "../../assets/pin1.jpg";
import useApplicationData from "../../hooks/useApplicationData";
import { NavLink } from "react-router-dom";

function NavHeader(props) {
  const { loginStatus } = useApplicationData();
  console.log({ loginStatus });
  return (
    <div className="navbar">
      <img className="navbar__pin" src={Pin}></img>
      <img src={logo} className="navbar__logo"></img>
      <div className="navbar__profile">
        <h2 className="navbar__welcome">Welcome , {loginStatus}</h2>
        <NavLink to="/">
          <img className="navbar__icon" src={profileIcon} alt="profile"></img>
        </NavLink>
      </div>
    </div>
  );
}

export default NavHeader;
