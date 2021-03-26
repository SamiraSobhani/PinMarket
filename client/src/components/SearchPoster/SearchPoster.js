import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import axios from "axios";
import MapForSearch from "../Map/MapForSearch";

class SearchPoster extends Component {
  state = {
    value: 2,
    response: {
      posters: [],
      categories: [],
      users: [],
    },
    myResult: [],
  };

  componentDidUpdate() {
    if (this.state.value !== 2) {
    }
  }

  getData() {
    axios
      .get("http://localhost:8080/posters")
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getData();
    this.distBtw2Ptss();
  }

  // HAVERSINE FORMULA USED FOR GREAT CIRCLE DISTANCE BETWEEN TWO POINTS, AKA 'AS-THE-CROW-FLIES'
  distBtw2Ptss = (p1, p2, p2id) => {
    const myArray = [];
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
        myArray.push({ distance, p2id, p2 });
      } catch (error) {
        return null;
      }
    });
    return this.filterDistance(myArray);
  };

  filterDistance = (myRes) => {
    const disArray = [];
    myRes.map((distanceObj) => {
      if (distanceObj.distance < this.state.value) {
        console.log(distanceObj);
        disArray.push(distanceObj);
        console.log(disArray);
        return disArray;
      }
    });
  };

  render() {
    this.distBtw2Ptss();

    return (
      <div className="slider">
        <InputRange
          formatLabel={(value) => `${value}KM`}
          maxValue={40}
          minValue={0}
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
          }}
        />
        {/* <MapForSearch newArray={filterDistance} /> */}
      </div>
    );
  }
}

export default SearchPoster;
