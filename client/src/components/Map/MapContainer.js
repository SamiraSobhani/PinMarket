import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import mapStyle from "./mapStyle";
import Locate from "./Locate";
import { useRef, useCallback, useContext, useEffect, useState } from "react";
import { appContext } from "./../appContext";
import HomePageMarkers from "./HomePageMarkers"
const mapContainerStyle = {
  width: "40vw",
  height: "62.5vh",
};

//Google map options
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

// ENABLED GMAPS LIBRARIES
const libraries = ["places"];

export default function MapContainer() {
  const { coord, setCoord, state, setState, zoom } = useContext(appContext);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const [selectedPoster, setSelectedPoster] = useState(null);
  const mapRef = useRef();

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.key === "Escape") {
  //       setSelectedPoster(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  // function selectedIcon(id) {
  //   const SC = state.categories.find((category) => category.id === id);
  //   return SC.icon;
  // }

  const panTo = useCallback(({ lat, lng }) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName="myMap"
        mapContainerStyle={mapContainerStyle}
        center={coord}
        zoom={zoom || 13}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          setSelectedPoster(null);
        }}
      >
        <Locate panTo={panTo} />
        <HomePageMarkers/>
        {/* {state.posters.map((poster) => (
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
          />
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
        )} */}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
