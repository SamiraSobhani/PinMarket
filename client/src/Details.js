import ShowPosterDetails from "./components/PosterDetails/ShowPosterDetails";
import React from "react";
import MyButtons from "./components/ThreeButton/MyButtons";
import { useParams } from "react-router-dom";

import Chat from "./components/Chat/Chat";
function Details() {
  const { id } = useParams();
  return (
    <div>
      <div>
        <ShowPosterDetails id={id} />
        <div className="details__buttons">
          <MyButtons />
        </div>
      </div>
      <div>
        <Chat/>
      </div>
    </div>
  );
}

export default Details;
