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
    console.log("inside get data");
    axios
      .get("http://localhost:8080/posters")
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {}
  getCategoryNameById(id) {
    return this.state.response.categories.find(
      (category) => category.id === id
    );
  }

  deletePoster = (id) => {
    axios
      .delete(`http://localhost:8080/posters/${id}`)
      .then((response) => {
        window.location.reload(false);
        const respobj = Object.assign({}, this.state.response, {
          posters: response.data,
        });
        this.setState({
          response: respobj,
        });
        console.log("inside delete fun", response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const filteredPoster = this.state.response.posters.filter(
      (poster) => poster.client_id === 1
    );
    const clientName = this.state.response.users.filter((user) => user.id == 1);

    return (
      <div className="posters__main">
        <div className="posters">
          <h2 className="posters__header">Posted Posters</h2>
          <ul className="posters__list">
            {filteredPoster.map((item, index) => (
              <PosterItem
                path="/userpage"
                key={index}
                eachPoster={item}
                clientName={clientName[0].name}
                categoryName={this.getCategoryNameById(item.category_id).name}
                delete={this.deletePoster}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
