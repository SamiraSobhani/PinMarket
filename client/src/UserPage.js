import React from "react";
import PostersList from "./components/PostersList/PostersList";
import AppliedList from "./components/AppliedList/AppliedList";
import MapContainer from "./components/Map/MapContainer";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";
import Navbar from "./components/Navbar/NavHeader";

function UserPage() {
  const {
    coord,
    setCoord,
    state,
    setState,
    loginStatus,
    setLoginStatus,
  } = useApplicationData();
  return (
    
    <appContext.Provider
      value={{ coord, setCoord, state, setState, loginStatus, setLoginStatus }}
    >
      {/* <Navbar /> */}
      <div className="user__container container">
        <PostersList className="user__post" />
        <div className="MapButton">
          <MapContainer className="user__map" />
          <MyButtons />
        </div>
        <AppliedList className="user__apply" />
      </div>
    </appContext.Provider>
   
  );
}

export default UserPage;
