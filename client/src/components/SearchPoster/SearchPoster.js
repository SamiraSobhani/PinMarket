import { useContext, useEffect, useState } from "react";
import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { appContext } from "./../appContext";
import MyButtons from "../ThreeButton/MyButtons";
import SearchMap from "./SearchMap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FilteredList from "./FilteredList";

function SearchPoster() {
  const { coord, state, setState, nearPosters, setnearPosters } =
    useContext(appContext);
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [className, setClassName] = useState("posters__content");
  const distBtw2Ptss = (p1, p2, p2id) => {
    const myArray = [];
    state.posters.map((poster) => {
      const p1 = [coord.lat, coord.lng];
      const p2 = [poster.lat, poster.lng];
      const p2id = poster.id;
      try {
        const lat1 = p1[0] / (180 / Math.PI);
        const lat2 = p2[0] / (180 / Math.PI);
        const lng1 = p1[1] / (180 / Math.PI);
        const lng2 = p2[1] / (180 / Math.PI);
        const distance =
          6371 *
          Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
          );

        myArray.push({ distance, p2id, p2 });
      } catch (error) {
        return null;
      }
    });
    return filterDistance(myArray);
  };

  const filterDistance = (myRes) => {
    const disArray = [];
    myRes.map((distanceObj) => {
      if (distanceObj.distance < value) {
        disArray.push(distanceObj.p2id);
        return posterAroundMe(disArray);
      }
    });
  };
  const posterAroundMe = (disArray) => {
    const myResult = [];
    disArray.map((posterId) => {
      state.posters.map((poster) => {
        if (poster.id === posterId) {
          myResult.push(poster);
        }
      });

      setnearPosters(myResult);
      return categorisedPosters(myResult);
    });
  };

  const categorisedPosters = (myResult) => {
    const res = [];
    myResult.map((poster) => {
      if (category) {
        if (poster.category.id === category.id) {
          res.push(poster);
        }
      }
      if (!category) {
        res.push(poster);
      }
    });
    setnearPosters(res);
    setClassName("posters__contentActive");
    return;
  };

  return (
    <div className="map__filter">
      <div className="filter">
        <div className="filter__distance">
          <p className="filter__text">Filter by Distance:</p>
          <div className="slider">
            <InputRange
              formatLabel={(value) => `${value}KM`}
              maxValue={40}
              minValue={0}
              value={value}
              onChange={(value) => {
                setValue(parseInt(value));
                distBtw2Ptss();
                setState((prevState) => ({
                  ...prevState,
                  posters: [...prevState.posters, nearPosters],
                }));
              }}
            />
          </div>
        </div>
        <div>
          <div className="filter__category">
            <p className="filter__text">Filter by Category:</p>
            <div className="category__filter">
              <Autocomplete
                onChange={(event, value) => setCategory(value)}
                id="category-search"
                name="category-search"
                value={state.categories.id}
                options={Object.values(state.categories)}
                getOptionLabel={(option) => option.name}
                style={{ width: 280, margin: 8 }}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </div>
          </div>
          <button
            className="filter__button"
            onClick={(categorisedPosters, distBtw2Ptss)}
          >
            Set Filter
          </button>
        </div>
        <div className={className}>
          <ul className="posters__list">
            {nearPosters.map((item, index) => (
              <FilteredList key={index} eachPoster={item} />
            ))}
          </ul>
        </div>
      </div>
      <div className="filter__map">
        <SearchMap nearPosters={nearPosters} />
        <MyButtons search="search" />
      </div>
    </div>
  );
}

export default SearchPoster;
