import React, { Component } from "react";
import axios from "axios";
import PosterItem from "./PosterItem";

export default class PostersList extends Component {
  state = {
    response: {
      posters: [],
      categories: [],
      users: [],
    },
  };

  getData() {
    axios
      .get("http://localhost:8080/posters")
      .then((res) => {
        this.setState({ response: res.data });
        console.log("im here");
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  // deleteInventory = (id) => {
  //   axios
  //     .delete(`http://localhost:8080/posters/${id}`)
  //     .then((response) => {
  //       this.setState({ list: response.data });
  //     })
  //     .catch((error) => console.log(error));
  //   this.getData();
  // };

  render() {
    console.log(this.state.response);
    const filteredPoster = this.state.response.posters.filter(
      (poster) => poster.client_id === 1
    );
    const clientName = this.state.response.users.filter((user) => user.id == 1);

    // console.log(clientName[0]["name"]);

    return (
      <div className="posters__main">
        <div className={"posters"}>
          <h2>Posted Posters</h2>
          <ul className={"posters__list"}>
            {filteredPoster.map((item, index) => (
              <PosterItem
                key={index}
                eachPoster={item}
                clientName={clientName[0].name}
                // delete={this.deletePoster}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
