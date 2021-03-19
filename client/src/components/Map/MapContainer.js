import React, { useState, useEffect, useContext } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import postersData from "../../data/posters.json";
import mapStyle from "./mapStyle";
import { appContext } from "./../appContext";

function Map() {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const { coord } = useContext(appContext);

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

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={coord}
      defaultOptions={{ styles: mapStyle }}
    >
      {postersData.map((poster) => (
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
            url: `/camera-retro-solid.svg`,
            scaledSize: new window.google.maps.Size(25, 25),
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
          <div>
            <h2>{selectedPoster.title}</h2>
            <p>{selectedPoster.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "60vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k&libraries=places`}
        loadingElement={<div style={{ height: `95%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
