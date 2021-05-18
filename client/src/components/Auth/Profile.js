import React, { Component } from "react";
import "./../../styles/pagesStyle/Profile/_ProfileHeader.scss";
import Timer from "./Timer";
class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {this.props.currentUser.imageUrl ? (
                <img
                  className="profile-img"
                  src={this.props.currentUser.imageUrl}
                  alt={this.props.currentUser.name}
                />
              ) : (
                <div className="text-avatar">
                  <span>
                    {this.props.currentUser.name &&
                      this.props.currentUser.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{this.props.currentUser.name}</h2>
              <p className="profile-email">{this.props.currentUser.email}</p>
            </div>
          </div>
        </div>
        <Timer />
      </div>
    );
  }
}

export default Profile;
