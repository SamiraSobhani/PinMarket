import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import mapStyle from "../Map/mapStyle";
import Locate from "../Map/Locate";
import { useRef, useCallback, useContext, useEffect, useState } from "react";
import { appContext } from "./../appContext";
import Markers from "./Markers";

const mapContainerStyle = {
  width: "40vw",
  height: "53.5vh",
};

//Google map options
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

// ENABLED GMAPS LIBRARIES
const libraries = ["places"];

export default function SearchMap(props) {
  const { coord, setCoord, state, setState, zoom } = useContext(appContext);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBtHbQpkqrCL-HBHAg_1fRVgowXaaZJSc4",
    libraries,
  });

  const [selectedPoster, setSelectedPoster] = useState(null);
  const mapRef = useRef();
  const nearPosters = useState(null);

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
        <Markers nearPosters={props.nearPosters} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
