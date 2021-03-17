import React from "react";
import profileIcon from "../../assets/Icons/profile-user.png";
function NavHeader() {
  return (
    <div className="navbar">
      <h1 className="navbar__logo">PinPal</h1>
      <div className="navbar__profile">
        <h2 className="navbar__welcome">Welcome, Ms.Dora</h2>
        <img className="navbar__icon" src={profileIcon} alt="profile"></img>
      </div>
    </div>
  );
}

export default NavHeader;
