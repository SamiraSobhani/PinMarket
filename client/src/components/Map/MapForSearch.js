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

function Map(props) {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const { coord, state } = useContext(appContext);

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

  // function drop() {
  //   for (var i = 0; i < state.posters.length; i++) {
  //     setTimeout(function () {
  //       addMarkerMethod();
  //     }, i * 200);
  //   }
  // }

  return (
    // console.log(props.newArray),
    <GoogleMap
      defaultZoom={14}
      defaultCenter={coord}
      defaultOptions={{ styles: mapStyle }}
    >
      {state.posters.map((poster) => (
        <Marker
          key={poster.id}
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
          <a href={`./posters/search/${selectedPoster.id}`}>
            <div>
              <h2>{selectedPoster.title}</h2>
              <p>{selectedPoster.description}</p>
            </div>
          </a>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div className="myMap">
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k&libraries=places`}
        loadingElement={<div style={{ height: `95%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
