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
  console.log(newMessage);
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
  return (
    <div className="addMessage">
      <TextField
        style={{ width: 450, margin: 10, marginTop: 5 }}
        label="Add new message"
        placeholder="Write..."
        fullWidth
        onChange={(event) => setContent(event.target.value)}
        autoComplete="off"
      />
      <button onClick={handleSubmitMessage}>Submit</button>
    </div>
  );
}

export default AddMessage;
