import React, { Component } from "react";
import axios from "axios";
import PosterItem from "./PosterItem";
import { ACCESS_TOKEN } from "../../components/constants";
export default class PostersList extends Component {
  state = {
    posters: [],
  };

  getMyPosters() {
    const ACCESS_TOKEN = localStorage.accessToken;

    axios
      .get("http://localhost:8080/posters/me", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        console.log("inside getMyposters", res);
        if (res !== null) {
          this.setState({ posters: res.data });
        }
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getMyPosters();
  }
  // componentDidUpdate() {
  //   this.deletePoster();
  // }
  deletePoster = (id) => {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .delete(`http://localhost:8080/poster?id=${id}`, {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((response) => {
        this.getMyPosters();
        // window.location.reload(false);
        console.log("inside delete fun", response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="posters__main">
        <div className="posters">
          <h2 className="posters__header">My Posters</h2>
          <ul className="posters__list">
            {this.state.posters.map((item, index) => (
              <PosterItem
                path="/userpage"
                key={index}
                eachPoster={item}
                delete={this.deletePoster}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
