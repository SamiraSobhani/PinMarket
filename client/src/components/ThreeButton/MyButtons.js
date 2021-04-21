import React from "react";
import { Link } from "react-router-dom";
function MyButtons() {
  return (
    <div className="threeButtons">
      <Link to="/posters/userpage">
        <button className="threeButtons__post">New Poster</button>
      </Link>
      <Link to="/posters">
        <button className="threeButtons__all">My Activity</button>
      </Link>
      <Link to="/posters/search">
        <button className="threeButtons__search">Search</button>
      </Link>
      <Link to="/posters/details">
        <button className="threeButtons__details">Details</button>
      </Link>
    </div>
  );
}

export default MyButtons;
