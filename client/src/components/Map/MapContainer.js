import React, { useState, useEffect, useContext } from "react";
import mapStyle from "./mapStyle";
import { appContext } from "./../appContext";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

function Map() {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const { coord, state } = useContext(appContext);

  //   function showLocation(position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     var latlongvalue = position.coords.latitude + ","
  //     + position.coords.longitude;
  //     // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
  //     // +latlongvalue+"&amp;zoom=14&amp;size=400x300&amp;key
  //     // =AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k";
  //     // document.getElementById("mapholder").innerHTML =
  //     // "<img src='"+img_url+"'>";
  //  }
  //  function errorHandler(err) {
  //     if(err.code == 1) {
  //        alert("Error: Access is denied!");
  //     } else if( err.code == 2) {
  //        alert("Error: Position is unavailable!");
  //     }
  //  }
  //  function getLocation(){
  //     if(navigator.geolocation){
  //        // timeout at 60000 milliseconds (60 seconds)
  //        var options = {timeout:60000};
  //        navigator.geolocation.getCurrentPosition
  //        (showLocation, errorHandler, options);
  //     } else{
  //        alert("Sorry, browser does not support geolocation!");
  //     }
  //  }

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPoster(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function selectedIcon(id) {
    const SC = state.categories.find((category) => category.id === id);
    return SC.icon;
  }

  return (
    <appContext.Provider value={{ coord, state }}>
      <button onClick="">show my location</button>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={coord}
        defaultOptions={{ styles: mapStyle }}
      >
        {state.posters.map((poster) => (
          <Marker
            key={poster.id}
            animation={window.google.maps.Animation.DROP}
            position={{
              lat: poster.latitude,
              lng: poster.longitude,
            }}
            onClick={() => {
              setSelectedPoster(poster);
            }}
            icon={{
              url: selectedIcon(poster.category_id),
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />
        ))}

        {selectedPoster && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPoster(null);
            }}
            position={{
              lat: selectedPoster.latitude,
              lng: selectedPoster.longitude,
            }}
          >
            <a
              className="infoWindow__click"
              href={`http://localhost:3000/posters/search/${selectedPoster.id}`}
            >
              <div>
                <h2>{selectedPoster.title}</h2>
                <p>{selectedPoster.description}</p>
              </div>
            </a>
          </InfoWindow>
        )}
      </GoogleMap>
    </appContext.Provider>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  const { coord, setcoord } = useContext(appContext);
  const something = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        window.location.reload();
      }
    };
  })();

  // const refresh = () => window.location.reload();
  return (
    <div className="myMap">
      <button type="button" onClick={something}>
        show my location
      </button>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k&libraries=places`}
        loadingElement={<div style={{ height: `95%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

// import React from "react";

// class Map extends React.Component {
//   state = {
//     latitude: null,
//     longitude: null,
//     userAddress: null,
//   };

//   getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.getLocation.getCurrentLocation(
//         this.getCoordinates,
//         // this.handleLocationError
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   getCoordinates(position) {
//     console.log(position);
//     this.setState({
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//     });
//     console.log(this.state.latitude);
//   }
//   handleLocationError = (error) => {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         alert = "User denied the request for Geolocation.";
//         break;
//       case error.POSITION_UNAVAILABLE:
//         alert = "Location information is unavailable.";
//         break;
//       case error.TIMEOUT:
//         alert = "The request to get user location timed out.";
//         break;
//       case error.UNKNOWN_ERROR:
//         alert = "An unknown error occurred.";
//         break;
//     }
//   };
//   render() {
//     console.log(this.state.longitude);
//     return (
//       <div>
//         <button onClick={this.getLocation}>get location</button>
//         <p>lat:{this.state.latitude}</p>
//         {this.state.latitude && this.state.longitude ? (
//           <img
//             src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=12&size=400*300&sensor=false&marker=color:red%7c${this.state.latitude},${this.state.longitude}?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k`}
//             alt=""
//           ></img>
//         ) : null}
//       </div>
//     );
//   }
// }
// export default Map;
