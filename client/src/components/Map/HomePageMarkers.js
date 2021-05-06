import React, { Component } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios";

class Markers extends Component {
  state = {
    posters: [],
    selectedPoster: null,
  };

  getPosters() {
    const ACCESS_TOKEN = localStorage.accessToken;

    axios
      .get("http://localhost:8080/posters/all", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        console.log("inside getposters", res);
        if (res !== null) {
          this.setState({ posters: res.data });
        }
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getPosters();
    const listener = (e) => {
      if (e.key === "Escape") {
        this.setState({ selectedPoster: null });
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }
  // componentDidUpdate(previousState) {
  //   const ACCESS_TOKEN = localStorage.accessToken;

  //   axios
  //     .get("http://localhost:8080/posters/all", {
  //       headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
  //     })
  //     .then((res) => {
  //       if (previousState.posters !== res.data) {
  //         this.setState({ posters: res.data });
  //       }
  //     });
  // }

  render() {
    return (
      <div>
        {this.state.posters.map((poster) => (
          <Marker
            key={poster.id}
            animation={window.google.maps.Animation.DROP}
            position={{
              lat: poster.lat,
              lng: poster.lng,
            }}
            onClick={() => {
              this.setState({ selectedPoster: poster });
            }}
            icon={{
              url: poster.category.icon,
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          ></Marker>
        ))}
        {this.state.selectedPoster && (
          <InfoWindow
            onCloseClick={() => {
              this.setState({ selectedPoster: null });
            }}
            position={{
              lat: this.state.selectedPoster.lat,
              lng: this.state.selectedPoster.lng,
            }}
            onClick={() => {
              alert("hello");
            }}
            onClick={() => {
              setcoord({
                lat: selectedPoster.lat,
                lng: selectedPoster.lng,
              });
            }}
          >
            <a
              className="infoWindow__click"
              href={`http://localhost:3000/posters/details/${this.state.selectedPoster.id}`}
            >
              <div>
                <h2>{this.state.selectedPoster.title}</h2>
                <p>{this.state.selectedPoster.description}</p>
              </div>
            </a>
          </InfoWindow>
        )}
      </div>
    );
  }
}

export default Markers;
