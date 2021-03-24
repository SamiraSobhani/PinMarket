import React from "react";
import MapContainer from "./components/Map/MapContainer";
import MyButtons from "./components/ThreeButton/MyButtons";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import SearchPoster from "./components/SearchPoster/SearchPoster";
import Chat from "./components/Chat/Chat";
import ShowPosterDetails from "./components/SearchPoster/ShowPosterDetails";

function Search() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div className="container">
        <MapContainer className="map" />
        <MyButtons />
        <SearchPoster className="slider" />
        <div className="chat-detail">
          <ShowPosterDetails className="detail" />
          <Chat className="chat" />
        </div>
      </div>
    </appContext.Provider>
  );
}

export default Search;
