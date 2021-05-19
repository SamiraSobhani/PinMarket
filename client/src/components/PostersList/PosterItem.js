import React from "react";
import ModalDelete from "./ModalDelete.js";

function PosterItem(props) {
  // console.log(props);
  return (
    <div>
      <li className="useritems">
        <div className="useritem">
          <h4>Title: {props.eachPoster.title}</h4>
          <p>Owner: {props.eachPoster.owner.name}</p>
          <div>
            <p>
              {props.eachPoster.category.name} for
              <span> ${props.eachPoster.price}/</span>
              <span>{props.eachPoster.payType}</span>
            </p>
          </div>
          <ModalDelete
            className="action"
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
