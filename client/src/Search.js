import React from "react";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import SearchPoster from "./components/SearchPoster/SearchPoster";
import Timer from "./components/Auth/Timer";
function Search() {
  const { coord, setCoord, state, setState, nearPosters, setnearPosters } =
    useApplicationData();
  return (
    <appContext.Provider
      value={{ coord, setCoord, state, setState, nearPosters, setnearPosters }}
    >
      <div className=" search__container container">
        <SearchPoster className="slider" />

        <Timer />
      </div>
    </appContext.Provider>
  );
}

export default Search;
