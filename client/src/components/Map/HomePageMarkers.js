import React from "react";
import { appContext } from "./../appContext";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";

function Markers(props) {
  const { coord, setCoord, state, setState } = useContext(appContext);
  const [selectedPoster, setSelectedPoster] = useState(null);

  function selectedIcon(id) {
    console.log("marker", state.posters);
    const SC = state.categories.find((category) => category.id === id);
    return SC.icon;
  }

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
    <div>
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
            url: selectedIcon(poster.category.id),
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
      )
    </div>
  );
}

export default Markers;
