import React from "react";
import profilePic from "../../assets/Icons/Mr.png";
import { useContext, useEffect, useState } from "react";
import { appContext } from "./../appContext";
function MessageItem(props) {
  const { state, setState } = useContext(appContext);

  //   Reply = (id) => {
  //     const Input = document.getElementById("{id}");
  //     if (Input.style.display === "block") {
  //       Input.style.display = "none";
  //     } else {
  //       Input.style.display = "block";
  //     }
  //   };
  return (
    <div>
      <li className="chat__items">
        <img className="chat__profilePic" src={profilePic}></img>
        <div className="chat__contents">
          <h3 className="chat__text">{props.parentMessage.content}</h3>
          <div>
            <span
              onClick={() => {
                const Input = document.getElementById(
                  `${props.parentMessage.id}`
                );
                if (Input.style.display === "block") {
                  Input.style.display = "none";
                } else {
                  Input.style.display = "block";
                }
              }}
              className="chat__reply"
            >
              Reply
            </span>
            <input className="chat__input" id={props.parentMessage.id}></input>
          </div>
        </div>
        <ul className="chat__nestedReplies">
          {props.parentMessage.nestedReplies.map((message) => (
            <li key={message.id} className="chat__item">
              <img className="chat__profilePic" src={profilePic}></img>
              <div className="chat__content">
                <p className="chat__text">{message.content}</p>
                <span
                  onClick={() => {
                    const Input = document.getElementById(`${message.id}`);
                    if (Input.style.display === "block") {
                      Input.style.display = "none";
                    } else {
                      Input.style.display = "block";
                    }
                  }}
                  className="chat__reply"
                >
                  Reply
                </span>
                <input className="chat__input" id={message.id}></input>
              </div>
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
}

export default MessageItem;
