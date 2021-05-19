import React from "react";

function FilteredList(props) {
  return (
    <a
      className="infoWindow__click"
      href={`http://localhost:3000/posters/details/${props.eachPoster.id}`}
    >
      <li className="useritems">
        <div className="useritem">
          <h4>Title: {props.eachPoster.title}</h4>
          <p>Owner: {props.eachPoster.owner.name}</p>
          <div>
            <p>
              <img className="filtered__icon" src={props.eachPoster.category.icon}></img>{" "}
              {props.eachPoster.category.name} for
              <span> ${props.eachPoster.price}/</span>
              <span>{props.eachPoster.payType}</span>
            </p>
          </div>
        </div>
      </li>
    </a>
  );
}

export default FilteredList;
