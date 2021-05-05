import React from "react";
import MapContainer from "./components/Map/MapContainer";
import PosterForm from "./components/PosterForm/PosterForm";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import MyButtons from "./components/ThreeButton/MyButtons";


function Home() {
  const {
    coord,
    setCoord,
    state,
    setState,
    loginStatus,
    setLoginStatus,
    zoom,
    setZoom,
  } = useApplicationData();

  return (
   
      <appContext.Provider
        value={{
          coord,
          setCoord,
          state,
          setState,
          loginStatus,
          setLoginStatus,
          zoom,
          setZoom,
        }}
      >
      
        <div className="container">
          <div className="main">
            <PosterForm className="posterForm" />
            <div className="MapButton">
              <MapContainer className="map" />
              <MyButtons myPost="post" />
            </div>
          </div>
        </div>
      </appContext.Provider>
   
  );
}

export default Home;

