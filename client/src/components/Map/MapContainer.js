import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import mapStyle from "./mapStyle";
import Locate from "./Locate";
import { useRef, useCallback, useContext, useEffect, useState } from "react";
import { appContext } from "./../appContext";
import HomePageMarkers from "./HomePageMarkers";

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
    googleMapsApiKey: "AIzaSyB7DoeDarvO7KhfNP_My1CeY1JPdCty5Dg",
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
