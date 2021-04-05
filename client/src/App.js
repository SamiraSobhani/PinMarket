import React from "react";
import MapContainer from "./components/Map/MapContainer";
import PosterForm from "./components/PosterForm/PosterForm";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";
import Navbar from "./components/Navbar/NavHeader";
function App() {
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
      <Navbar loginStatus={loginStatus} />
      <div className="container">
        <div className="main">
          <PosterForm className="posterForm" />
          <div className="MapButton">
            <MapContainer className="map" />
            <MyButtons />
          </div>
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
