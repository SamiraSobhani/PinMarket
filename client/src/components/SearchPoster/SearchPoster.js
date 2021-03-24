import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import axios from "axios";

class SearchPoster extends Component {
  state = {
    value: 0,
    response: {
      posters: [],
      categories: [],
      users: [],
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://localhost:8080/posters")
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((error) => console.log(error));
  }

  // HAVERSINE FORMULA USED FOR GREAT CIRCLE DISTANCE BETWEEN TWO POINTS, AKA 'AS-THE-CROW-FLIES'
  distBtw2Ptss = (p1, p2, p2id) => {
    const myResult = [];
    this.state.response.posters.map((poster) => {
      const p1 = [49.2834, -123.1157];
      const p2 = [poster.latitude, poster.longitude];
      const p2id = poster.id;
      try {
        const lat1 = p1[0] / (180 / Math.PI);
        const lat2 = p2[0] / (180 / Math.PI);
        const lng1 = p1[1] / (180 / Math.PI);
        const lng2 = p2[1] / (180 / Math.PI);
        const distance =
          6371 *
          Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
          );
        console.log({ distance, p2id });
        myResult.push({ distance, p2id });
      } catch (error) {
        return null;
      }
    });
    return myResult;
  };



  render() {
    this.distBtw2Ptss();
    
    return (
      <div className="slider">
        <InputRange
          formatLabel={(value) => `${value}KM`}
          maxValue={50}
          minValue={0}
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
            this.distBtw2Ptss();
          }}
        />
      </div>
    );
  }
}

export default SearchPoster;
