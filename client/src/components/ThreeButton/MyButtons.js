import React from "react";
import { Link } from "react-router-dom";
function MyButtons() {
  return (
    <div className="threeButtons">
      <Link to="/posters">
        <button className="threeButtons__post">Post a New Poster</button>
      </Link>
      <Link to="/posters/userpage">
        <button className="threeButtons__all">All Activity</button>
      </Link>
      <Link to="/posters/search">
        <button className="threeButtons__search">Search</button>
      </Link>
    </div>
  );
}

export default MyButtons;
