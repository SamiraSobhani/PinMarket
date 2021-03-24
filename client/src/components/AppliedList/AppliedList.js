import React, { Component } from "react";
import axios from "axios";
import PosterItem from "../PostersList/PosterItem";
import "../../styles/pagesStyle/userPageStyle/_appliedList.scss";

export class AppliedList extends Component {
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
      })
      .catch((error) => console.log(error));
  }

  getCategoryNameById(id) {
    return this.state.response.categories.find(
      (category) => category.id === id
    );
  }

  getClientNameById(id) {
    return this.state.response.users.find((user) => user.id === id);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const filteredPoster = this.state.response.posters.filter(
      (poster) => poster.helper_id === 1
    );
    const clientName = this.state.response.users.filter(
      (user) => user.id == filteredPoster.client_id
    );
    return (
      <div>
        <h2>Applied List</h2>
        <ul className={"posters__list"}>
          {filteredPoster.map((item, index) => (
            <PosterItem
              key={index}
              eachPoster={item}
              clientName={this.getClientNameById(item.client_id).name}
              categoryName={this.getCategoryNameById(item.category_id).name}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default AppliedList;
