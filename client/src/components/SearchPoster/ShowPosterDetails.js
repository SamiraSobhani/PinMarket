import React, { Component } from "react";
import axios from "axios";
import profilePic from "../../assets/Icons/profile-user.png";

export default class ShowPosterDetails extends Component {
  state = {
    response: {
      singlePoster: [],
      categoryName: "",
      clientName: "",
    },
  };

  getData() {
    axios
      .get(`http://localhost:8080/posters/${this.props.id}`)
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const posterobj = this.state.response.singlePoster[0];
    return (
      <div className="search">
        <img className="search__profilePic" src={profilePic}></img>
        <h2 className="search__name">Name: {this.state.response.clientName}</h2>
        <h3>Category: {this.state.response.categoryName}</h3>
        <h3>Title: {posterobj && posterobj.title}</h3>

        <h3>Description: {posterobj && posterobj.description}</h3>

        <h3>Start Date: {posterobj && posterobj.start_date}</h3>

        <h3>End Date: {posterobj && posterobj.end_date}</h3>

        <h3>
          Price: $ {posterobj && posterobj.price}{" "}
          {posterobj && posterobj.pay_type}
        </h3>
        <button className="apply-button">Apply</button>
      </div>
    );
  }
}
