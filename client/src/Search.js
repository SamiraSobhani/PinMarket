import React from "react";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import SearchPoster from "./components/SearchPoster/SearchPoster";

function Search() {
  const {
    coord,
    setCoord,
    state,
    setState,
    nearPosters,
    setnearPosters,
  } = useApplicationData();
  return (
    <appContext.Provider
      value={{ coord, setCoord, state, setState, nearPosters, setnearPosters }}
    >
      <div className=" search__container container">
        <div>
          <SearchPoster className="slider" />
        </div>
      </div>
    </appContext.Provider>
  );
}

export default Search;
