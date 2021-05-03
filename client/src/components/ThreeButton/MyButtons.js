import React from "react";
import { Link } from "react-router-dom";
function MyButtons(props) {
  return (
    <div className="threeButtons">
      <Link to="/posters/userpage">
        <button className="threeButtons__post" id={props.myPost}>
          New Poster
        </button>
      </Link>
      <Link to="/posters">
        <button className="threeButtons__all" id={props.allActivity}>
          My Activity
        </button>
      </Link>
      <Link to="/posters/search">
        <button className="threeButtons__search" id={props.search}>
          Search
        </button>
      </Link>
    </div>
  );
}

export default MyButtons;
