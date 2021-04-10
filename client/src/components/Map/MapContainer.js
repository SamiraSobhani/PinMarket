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

export default function Index() {
  const {
    coord,
    setCoord,
    state,
    setState,
    loginStatus,
    setLoginStatus,
    zoom,
    setZoom,
  } = useContext(appContext);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const [selectedPoster, setSelectedPoster] = useState(null);
  const mapRef = useRef();

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

  const panTo = useCallback(({ lat, lng }) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
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
        zoom={zoom || 15}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          setSelectedPoster(null);
        }}
      >
        <Locate panTo={panTo} />
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
            onClick={() => {
              setcoord({
                lat: selectedPoster.latitude,
                lng: selectedPoster.longitude,
              });
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
    </>
  ) : (
    <></>
  );
}
