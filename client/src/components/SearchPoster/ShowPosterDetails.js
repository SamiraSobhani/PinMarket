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
      .get(`http://localhost:8080/posters/${id}`)
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <div className="search">
        <img className="search__profilePic" src={profilePic}></img>
        <h2 className="search__name">
          Name:
          {/* {this.state.clientName} */}
        </h2>
        <h3>Title:</h3>
        <p>{/* {this.state.response.posters.title} */}</p>
        <h3>Description:</h3>
        <p>{/* {this.state.response.posters.description} */}</p>
        <h3>Start Date:</h3>
        <p>{/* {this.state.response.posters.start_date} */}</p>
        <h3>End Date:</h3>
        <p>{/* {this.state.response.posters.end_date} */}</p>
        <h3>Price: $</h3>
        <p>
          {/* {this.state.response.posters.price}{" "}
          {this.state.response.posters.pay_type} */}
        </p>
      </div>
    );
  }
}
