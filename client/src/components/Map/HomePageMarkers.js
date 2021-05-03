import React, { Component } from "react";
import { appContext } from "./../appContext";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
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
  componentWillMount() {
    this.getPosters();
  }
  componentDidMount() {
   
    const listener = (e) => {
      if (e.key === "Escape") {
        this.setState({ SelectedPoster: null });
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }
//   componentDidUpdate() {
//     this.getPosters();
//   }

  // function Markers(props) {
  //   const { coord, setCoord, state, setState } = useContext(appContext);
  //   const [selectedPoster, setSelectedPoster] = useState(null);

  //   function selectedIcon(id) {
  //     console.log("marker", state.posters);
  //     const SC = state.categories.find((category) => category.id === id);
  //     return SC.icon;
  //   }

  //   useEffect(() => {
  //     const listener = (e) => {
  //       if (e.key === "Escape") {
  //         setSelectedPoster(null);
  //       }
  //     };
  //     window.addEventListener("keydown", listener);

  //     return () => {
  //       window.removeEventListener("keydown", listener);
  //     };
  //   }, []);
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
              this.setState({ SelectedPoster: poster });
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
              this.setState({ SelectedPoster: null });
            }}
            position={{
              lat: selectedPoster.lat,
              lng: selectedPoster.lng,
            }}
            // onClick={() => {
            //   setcoord({
            //     lat: selectedPoster.lat,
            //     lng: selectedPoster.lng,
            //   });
            // }}
          >
            <a
              className="infoWindow__click"
              href={`http://localhost:3000/posters/details/${selectedPoster.id}`}
            >
              <div>
                <h2>{selectedPoster.title}</h2>
                <p>{selectedPoster.description}</p>
              </div>
            </a>
          </InfoWindow>
        )}
        )
      </div>
    );
  }
}

export default Markers;
