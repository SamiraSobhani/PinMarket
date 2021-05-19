import React, { Component } from "react";
import axios from "axios";
import PosterItem from "../PostersList/PosterItem";

export class AppliedList extends Component {
  state = {
    posters: [],
  };

  getMyAppliedPosters() {
    const ACCESS_TOKEN = sessionStorage.accessToken;
    axios
      .get("http://localhost:8080/posters/applied", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        this.setState({ posters: res.data });
      })
      .catch((error) => console.log(error));
  }

  deletePoster = (id) => {
    const ACCESS_TOKEN = sessionStorage.accessToken;
    axios
      .delete(`http://localhost:8080/poster?id=${id}`, {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((response) => {
        this.getMyAppliedPosters();
        // window.location.reload(false);
        console.log("inside delete applied", response);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getMyAppliedPosters();
  }

  render() {
    return (
      <div>
        <h2 className="posters__header">Applied Poster</h2>
        <ul className="posters__list">
          {this.state.posters.map((item, index) => (
            <PosterItem
              key={index}
              eachPoster={item}
              delete={this.deletePoster}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default AppliedList;
