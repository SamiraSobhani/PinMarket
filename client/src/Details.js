import ShowPosterDetails from "./components/PosterDetails/ShowPosterDetails";
import React from "react";
import MyButtons from "./components/ThreeButton/MyButtons";
import { useParams } from "react-router-dom";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import Chat from "./components/Chat/Chat";
import AddMessage from "./components/Chat/AddMessage";

function Details() {
  const { id } = useParams();
  const { state, setState } = useApplicationData();
  return (
    <appContext.Provider value={{ state, setState }}>
      <div className="details">
        <div className="detailsAndButtons">
          <div className="details__buttons">
            <MyButtons />
          </div>
          <ShowPosterDetails id={id} />
        </div>
        <div className="details__chat">
          {/* <AddMessage /> */}
          <Chat id={id} />
        </div>
      </div>
    </appContext.Provider>
  );
}

export default Details;