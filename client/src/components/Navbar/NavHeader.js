import React from "react";
import profileIcon from "../../assets/Icons/profile-user.png";
import logo from "../../assets/Capture.PNG";
import Pin from "../../assets/pin1.jpg";

function NavHeader() {
  return (
    <div className="navbar">
      <img className="navbar__pin" src={Pin}></img>
      <img src={logo} className="navbar__logo"></img>
      <div className="navbar__profile">
        <h2 className="navbar__welcome">Welcome, Ms.Dora</h2>
        <img className="navbar__icon" src={profileIcon} alt="profile"></img>
      </div>
    </div>
  );
}

export default NavHeader;
