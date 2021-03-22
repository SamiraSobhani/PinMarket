import React from "react";
import { Link } from "react-router-dom";
function MyButtons() {
  return (
    <div>
      <Link to="/posters">
        <button>Post a New Poster</button>
      </Link>
      <Link to="/posters/userpage">
        <button>All Activity</button>
      </Link>
      <Link to="/posters/search">
        <button>Search</button>
      </Link>
    </div>
  );
}

export default MyButtons;
