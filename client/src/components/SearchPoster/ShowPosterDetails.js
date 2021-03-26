import React, { Component } from "react";
import axios from "axios";
import profilePic from "../../assets/Icons/Mr.png";

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
        <div className="search__boxheader">
          <h2 className="search__name">
            Name: {this.state.response.clientName}
          </h2>
          <img className="search__profilePic" src={profilePic}></img>
        </div>
        <div className="search__div">
          <h3>Category: </h3>
          <span>{this.state.response.categoryName}</span>
        </div>
        <div className="search__div">
          <h3>Title: </h3>
          <span>{posterobj && posterobj.title}</span>
        </div>
        <div className="search__div">
          <h3>Description: </h3>
          <span> {posterobj && posterobj.description}</span>
        </div>
        <div className="search__div">
          <h3>Start Date: </h3>
          <span> {posterobj && posterobj.start_date}</span>
        </div>
        <div className="search__div">
          <h3>End Date: </h3>
          <span> {posterobj && posterobj.end_date}</span>
        </div>
        <div className="search__div">
          <h3>Price: $ </h3>
          <span>
            {posterobj && posterobj.price} {posterobj && posterobj.pay_type}
          </span>
        </div>
        <button className="apply-button">Apply</button>
      </div>
    );
  }
}
