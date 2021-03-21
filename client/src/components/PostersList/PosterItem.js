import React from "react";

function PosterItem(props) {
  const posterInfo = props.eachPoster;

  return (
    <div>
      <li className={"poster__item"}>
        <div className={"item"}>
          <h4>{props.eachPoster.title}</h4>
          <p>{props.eachPoster.price}</p>
          <p>{props.clientName}</p>
        </div>
      </li>
    </div>
  );
}

export default PosterItem;
