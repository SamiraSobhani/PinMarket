import React from "react";
import MapContainer from "./components/Map/MapContainer";
import PosterForm from "./components/PosterForm/PosterForm";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";
import Login from "./components/Login/Login";

function App() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div className="container">
        <div className="main">
          <PosterForm className="posterForm" />
          <div className="MapButton">
            <MapContainer className="map" />
            <MyButtons />
          </div>
          {/* <Login /> */}
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
