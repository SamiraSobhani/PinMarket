import React, { Component } from "react";
import MapContainer from "./components/Map/MapContainer";
import NavHeader from "./components/Navbar/NavHeader";
import PosterForm from "./components/PosterForm/PosterForm";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";

function App() {
  // state = {};

  const { coord, setCoord,state, setState} = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div>
        <NavHeader />
        <MapContainer />
        <PosterForm />
      </div>
    </appContext.Provider>
  );
}

export default App;
