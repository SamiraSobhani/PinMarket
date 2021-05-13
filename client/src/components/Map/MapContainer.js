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
import HomePageMarkers from "./HomePageMarkers";
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
        <HomePageMarkers />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
