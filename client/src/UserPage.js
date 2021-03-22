import React from "react";
import PostersList from "./components/PostersList/PostersList";
import AppliedList from "./components/AppliedList/AppliedList";
import MapContainer from "./components/Map/MapContainer";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";

function UserPage() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div className="container">
        <MapContainer className="user__map" />
        <MyButtons />
        <div className="user__posterList">
          <PostersList className="user__post" />
          <AppliedList className="user__apply" />
        </div>
      </div>
    </appContext.Provider>
  );
}

export default UserPage;
