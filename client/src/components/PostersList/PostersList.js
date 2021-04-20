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
        console.log("inside getmyposters", res);
        this.setState({ posters: res.data });
      })
      .catch((error) => console.log(error));
  }

  // getMyAppliedPosters() {
  //   const ACCESS_TOKEN = localStorage.accessToken;
  //   axios
  //     .get("http://localhost:8080/posters/applied", {
  //       headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
  //     })
  //     .then((res) => {
  //       this.setState({ posters: res.data });
  //     })
  //     .catch((error) => console.log(error));
  // }

  componentDidMount() {
    this.getMyPosters();
  }

  deletePoster = (id) => {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .delete(`http://localhost:8080/poster?id=${id}`, {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((response) => {
        // window.location.reload(false);
        const respobj = Object.assign({}, this.state, {
          posters: response.data,
        });
        this.setState({
          posters: respobj,
        });
        console.log("inside delete fun", response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="posters__main">
        <div className="posters">
          <h2 className="posters__header">Posted Posters</h2>
          <ul className="posters__list">
            {this.state.posters.map((item, index) => (
              <PosterItem
                path="/userpage"
                key={index}
                eachPoster={item}
                // clientName={clientName[0].name}

                delete={this.deletePoster}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
