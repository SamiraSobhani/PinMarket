import React from "react";
import MapContainer from "./components/Map/MapContainer";
import MyButtons from "./components/ThreeButton/MyButtons";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
function Search() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div className="container">
        <MapContainer className="map" />
        <MyButtons />
      </div>
    </appContext.Provider>
  );
}

export default Search;
