import React from "react";
import profilePic from "../../assets/Icons/Mr.png";
import { useContext, useEffect, useState, useRef } from "react";
import { appContext } from "./../appContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
function MessageItem(props) {
  const { state, setState } = useContext(appContext);

  let userImage = profilePic;
  const getImage = (userImage) => {
    if (props.parentMessage.userImage !== null) {
      userImage = props.parentMessage.userImage;
    }
    return userImage;
  };
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState({
    posterId: parseInt(id),
    content: "",
    inReplyToMessageId: props.parentMessage.id,
  });

  const nestedReplies = Object.values(props.parentMessage)[9];

  const handleChange = (event) => {
    setNewMessage((prevState) => ({
      ...prevState,
      // inReplyToMessageId: id,
      content: event.target.value,
    }));

    // console.log("inside handle change");
  };

  const handleSubmitMessage = (e) => {
    if (e.key === "Enter") {
      const ACCESS_TOKEN = sessionStorage.accessToken;
      axios
        .post(`http://localhost:8080/message`, newMessage, {
          headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          console.log("after post method", newMessage);
          // console.log(props.parentMessage.nestedReplies);
          console.log("after post method", newMessage.userImage);
          window.location.reload(false);
          // window.history.pushState({}, "");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="chat__box">
      <li className="chat__items">
        <div className="chat__header">
          <img className="chat__profilePic" src={getImage()}></img>
          <span className="chat__userName">{props.parentMessage.userName}</span>
        </div>
        <div className="chat__contents">
          <p className="chat__mainText">{props.parentMessage.content}</p>
          <p className="chat__time">
            {moment(props.parentMessage.timestamp).fromNow()}
          </p>
        </div>
        <ul className="chat__nestedReplies">
          {nestedReplies.map((message) => (
            <li key={message.id} className="chat__item">
              <div className="chat__header">
                <img className="chat__profilePic" src={message.userImage}></img>
                <span className="chat__userName">{message.userName}</span>
              </div>
              <div className="chat__content">
                <p className="chat__text">{message.content}</p>
                <p className="chat__time">
                  {moment(message.timestamp).fromNow()}
                </p>
                <input
                  type="text"
                  className="chat__input"
                  id={message.id}
                  onChange={handleChange}
                  autoComplete="off"
                  onKeyDown={handleSubmitMessage}
                />
              </div>
              {/* <Timestamp relative date={Date} autoUpdate /> */}
            </li>
          ))}
        </ul>
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
          <input
            className="chat__input"
            id={props.parentMessage.id}
            onChange={handleChange}
            autoComplete="off"
            onKeyDown={handleSubmitMessage}
          ></input>
          <hr className="chat__line" />
        </div>
      </li>
    </div>
  );
}

export default MessageItem;
