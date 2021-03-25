import React from "react";
import MapForSearch from "./components/Map/MapForSearch";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import SearchPoster from "./components/SearchPoster/SearchPoster";
import Chat from "./components/Chat/Chat";
import ShowPosterDetails from "./components/SearchPoster/ShowPosterDetails";
import { useParams } from "react-router-dom";
import MyButtons from "./components/ThreeButton/MyButtons";
function Search() {
  const { id } = useParams();
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ coord, setCoord, state, setState }}>
      <div className=" search__container container">
        <div>
          <MapForSearch />
          <MyButtons />
        </div>
        <div className="chat-detail">
          <SearchPoster className="slider" />
          <ShowPosterDetails id={id} className="detail" />
          <Chat className="chat" />
        </div>
      </div>
    </appContext.Provider>
  );
}

export default Search;
