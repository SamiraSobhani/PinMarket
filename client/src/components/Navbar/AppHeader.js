import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
// import './AppHeader.css';
import logo from "../../assets/FinalLogo.svg";
import Pin from "../../assets/pin1.jpg";
class AppHeader extends Component {
  render() {
    const currentUser = this.props;
    console.log(this.props);
    return (
      <header className="app-header">
        <img className="navbar__pin" src={Pin}></img>
        <Link to="/posters" className="app-title">
          <img src={logo} className="profile-logo"></img>
        </Link>

        <div className="app-options">
          <h2 className="navbar__welcome ">
            <img className="navbar__image" src={this.props.currentUserImage}></img>Welcome ,{" "}
            {this.props.currentUserName}
          </h2>
          <nav className="app-nav">
            {this.props.authenticated ? (
              <ul>
                <li>
                  <NavLink to="/posters">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink onClick={this.props.onLogout} to="/signup">
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default AppHeader;
