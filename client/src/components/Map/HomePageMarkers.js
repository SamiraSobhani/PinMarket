import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { appContext } from "./../appContext";
import { useContext, useEffect, useState } from "react";
import homeIcon from "../../assets/Icons/home4.png";

function Markers() {
  const { coord, state } = useContext(appContext);
  const [selectedPoster, setSelectedPoster] = useState(null);

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
  });

  return (
    <div>
      <Marker
        animation={window.google.maps.Animation.DROP}
        position={{
          lat: coord.lat,
          lng: coord.lng,
        }}
        icon={{
          url: homeIcon,
          scaledSize: new window.google.maps.Size(35, 42),
        }}
      ></Marker>
      {state.posters.map((poster) => (
        <Marker
          key={poster.id}
          animation={window.google.maps.Animation.DROP}
          position={{
            lat: poster.lat,
            lng: poster.lng,
          }}
          onClick={() => {
            setSelectedPoster(poster);
          }}
          icon={{
            url: poster.category.icon,
            scaledSize: new window.google.maps.Size(42, 42),
          }}
        ></Marker>
      ))}
      {selectedPoster && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPoster(null);
          }}
          position={{
            lat: selectedPoster.lat,
            lng: selectedPoster.lng,
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
            href={`http://localhost:3000/posters/details/${selectedPoster.id}`}
          >
            <div>
              <h2>{selectedPoster.title}</h2>
              <p>{selectedPoster.description}</p>
            </div>
          </a>
        </InfoWindow>
      )}
    </div>
  );
}

export default Markers;
