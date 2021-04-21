import React from "react";
import SearchMap from "./components/SearchPoster/SearchMap";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import SearchPoster from "./components/SearchPoster/SearchPoster";
import Chat from "./components/Chat/Chat";
import ShowPosterDetails from "./components/SearchPoster/ShowPosterDetails";
import { useParams } from "react-router-dom";
import MyButtons from "./components/ThreeButton/MyButtons";
import Navbar from "./components/Navbar/NavHeader";

function Search() {
  const { id } = useParams();
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
     
      <div className=" search__container container">
        <div>
          {/* <SearchMap />
          <MyButtons /> */}
          <SearchPoster className="slider" />
        </div>
        <div className="chat-detail">
          <ShowPosterDetails id={id} className="detail" />
          {/* <Chat className="chat" /> */}
        </div>
      </div>
    </appContext.Provider>
  );
}

export default Search;
