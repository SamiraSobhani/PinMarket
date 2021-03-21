import React from "react";
import PostersList from "./components/PostersList/PostersList";
import MapContainer from "./components/Map/MapContainer";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";

function UserPage() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
 
      <div className="container">
        <MapContainer className="map" />
        <PostersList />
      </div>
    </appContext.Provider>
  );
}

export default UserPage;
