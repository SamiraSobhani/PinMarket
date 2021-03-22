import React from "react";
import PosterAction from "./ModalDelete.js";

function PosterItem(props) {
  return (
    <div>
      <li className={"poster__item"}>
        <div className={"item"}>
          <h4>{props.eachPoster.title}</h4>
          <p>{props.eachPoster.price}</p>
          <p>{props.clientName}</p>
          <span>{props.categoryName}</span>

          <PosterAction
            path={props.path}
            delete={props.delete}
            id={props.eachPoster.id}

          />
        </div>
      </li>
    </div>
  );
}

export default PosterItem;
