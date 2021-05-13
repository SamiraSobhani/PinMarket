import React from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddMessage() {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const newMessage = {
    posterId: parseInt(id),
    content: content,
    inReplyToMessageId: -1,
  };
  // const [color, setColor] = useState("rgb(128, 128, 128)");
 
  const handleSubmitMessage = () => {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .post(`http://localhost:8080/message`, newMessage, {
        headers: {
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };
  // const changeColor = (color) => {
  //   setColor({ color });
  // };
  return (
    <div
      //  style={{ background: color }}
      className="addMessage"
    >
      <TextField
        style={{ width: 450, margin: 10, marginTop: 5 }}
        label="Type your message"
        placeholder="Write..."
        fullWidth
        onChange={(event) => setContent(event.target.value)}
        autoComplete="off"
      />
      <button
        onClick={
          handleSubmitMessage
          // ,changeColor("#01192d")
        }
      >
        Submit
      </button>
    </div>
  );
}

export default AddMessage;
