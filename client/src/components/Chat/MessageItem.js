import React from "react";
import profilePic from "../../assets/Icons/Mr.png";
import { useContext, useEffect, useState, useRef } from "react";
import { appContext } from "./../appContext";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      const ACCESS_TOKEN = localStorage.accessToken;
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
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <li className="chat__items">
        <img className="chat__profilePic" src={getImage()}></img>
        <span>{props.parentMessage.userName}</span>
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
            <input
              className="chat__input"
              id={props.parentMessage.id}
              onChange={handleChange}
              autoComplete="off"
              // onSubmit={handleSubmitMessage}
              onKeyDown={handleSubmitMessage}
            ></input>
          </div>
        </div>
        <ul className="chat__nestedReplies">
          {nestedReplies.map((message) => (
            <li key={message.id} className="chat__item">
              <img className="chat__profilePic" src={message.userImage}></img>
              <span>{message.userName}</span>
              <div className="chat__content">
                <p className="chat__text">{message.content}</p>
                {/* <span
                  className="chat__reply"
                  onClick={() => {
                    const Input = document.getElementById(`${message.id}`);
                  
                    if (Input.style.display === "block") {
                      Input.style.display = "none";
                    } else {
                      Input.style.display = "block";
                    }
                  }}
                >
                  Reply
                </span> */}
                <input
                  type="text"
                  className="chat__input"
                  id={message.id}
                  onChange={handleChange}
                  autoComplete="off"
                  // onSubmit={handleSubmitMessage}
                  onKeyDown={handleSubmitMessage}
                />
              </div>
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
}

export default MessageItem;
