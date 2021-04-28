import React, { Component } from "react";
import axios from "axios";
import PosterItem from "../PostersList/PosterItem";

export class AppliedList extends Component {
  state = {
    posters: [],
  };

  getMyAppliedPosters() {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .get("http://localhost:8080/posters/applied", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        this.setState({ posters: res.data });
      })
      .catch((error) => console.log(error));
  }

  // getClientNameById(id) {
  //   return this.state.response.users.find((user) => user.id === id);
  // }

  componentDidMount() {
    this.getMyAppliedPosters();
  }

  render() {
    return (
      <div>
        <h2 className="posters__header">Applied Poster</h2>
        <ul className={"posters__list"}>
          {this.state.posters.map((item, index) => (
            <PosterItem
              key={index}
              eachPoster={item}
              // clientName={this.getClientNameById(item.client_id).name}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default AppliedList;
