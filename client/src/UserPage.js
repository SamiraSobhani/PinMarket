import React from "react";
import PostersList from "./components/PostersList/PostersList";
import AppliedList from "./components/AppliedList/AppliedList";
import MapContainer from "./components/Map/MapContainer";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";
import Timer from "./components/Auth/Timer";

function UserPage() {
  const {
    coord,
    setCoord,
    state,
    setState,
    loginStatus,
    setLoginStatus,
  } = useApplicationData();
  console.log(sessionStorage.getItem("_expiredTime"));
  return (
    <appContext.Provider
      value={{ coord, setCoord, state, setState, loginStatus, setLoginStatus }}
    >
      <div className="user__container container">
        <PostersList className="user__post" />
        <div className="MapButton">
          <MapContainer className="user__map" />
          <MyButtons allActivity="all" />
        </div>
        <AppliedList className="user__apply" />
        <Timer />
      </div>
    </appContext.Provider>
  );
}

export default UserPage;
