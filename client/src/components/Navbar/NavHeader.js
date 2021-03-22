import React from "react";
import profileIcon from "../../assets/Icons/profile-user.png";
import logo from "../../assets/logo.png"
function NavHeader() {
  return (
    <div className="navbar">
      <img src={logo} className="navbar__logo"></img>
      <div className="navbar__profile">
        <h2 className="navbar__welcome">Welcome, Ms.Dora</h2>
        <img className="navbar__icon" src={profileIcon} alt="profile"></img>
      </div>
    </div>
  );
}

export default NavHeader;
