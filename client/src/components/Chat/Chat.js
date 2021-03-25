import React, { useState, useEffect, useRef } from "react";

import io from "socket.io-client";

// const Page = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100%;
//   align-items: center;
//   flex-direction: column;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 500px;
//   max-height: 500px;
//   overflow: auto;
//   width: 400px;
//   border: 1px solid black;
//   border-radius: 10px;
//   padding-bottom: 10px;
//   margin-top: 25px;
//   background-color: white;
// `;

// const TextArea = styled.textarea`
//   width: 98%;
//   height: 100px;
//   border-radius: 10px;
//   margin-top: 10px;
//   padding-left: 10px;
//   padding-top: 10px;
//   font-size: 17px;
//   background-color: white;
//   border: 1px solid black;
//   outline: none;
//   color: darkgray;
//   letter-spacing: 1px;
//   line-height: 20px;
//   ::placeholder {
//     color: gray;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   border: none;
//   height: 50px;
//   border-radius: 10px;
//   color: white;
//   font-size: 17px;
//   background-color: darkred;
// `;

// const Form = styled.form`
//   width: 400px;
// `;

// const MyRow = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 10px;
// `;

// const MyMessage = styled.div`
//   width: 45%;

//   color: black;
//   padding: 10px;
//   margin-right: 5px;
//   text-align: center;
//   border-top-right-radius: 10%;
//   border-bottom-right-radius: 10%;
// `;

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="chat">
      <section className="Container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <p className="MyRow" key={index}>
                <p>{message.body}</p>
              </p>
            );
          }
          return (
            <p className="PartnerRow" key={index}>
              <p>{message.body}</p>
            </p>
          );
        })}
      </section>
      <form className="Form" onSubmit={sendMessage}>
        <textarea
          className="TextArea"
          value={message}
          onChange={handleChange}
          placeholder="Say something..."
        />
        <button className="Button">Send</button>
      </form>
    </div>
  );
};

export default App;
