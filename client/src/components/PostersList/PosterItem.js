import React from "react";
import ModalDelete from "./ModalDelete.js";

function PosterItem(props) {
  return (
    <div>
      <li className="useritems">
        <div className="useritem">
          <h4>{props.eachPoster.title}</h4>
          <p>{props.clientName}</p>
          <div>
            <p>
              {props.categoryName} for
              <span> ${props.eachPoster.price}/</span>
              <span>{props.eachPoster.pay_type}</span>
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
