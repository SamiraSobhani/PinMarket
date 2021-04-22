// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";

// const App = () => {
//   const [yourID, setYourID] = useState();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const socketRef = useRef();

//   useEffect(() => {
//     socketRef.current = io.connect("/");

//     socketRef.current.on("your id", (id) => {
//       setYourID(id);
//     });

//     socketRef.current.on("message", (message) => {
//       console.log("here");
//       receivedMessage(message);
//     });
//   }, []);

//   function receivedMessage(message) {
//     setMessages((oldMsgs) => [...oldMsgs, message]);
//   }

//   function sendMessage(e) {
//     e.preventDefault();
//     const messageObject = {
//       body: message,
//       id: yourID,
//     };
//     setMessage("");
//     socketRef.current.emit("send message", messageObject);
//   }

//   function handleChange(e) {
//     setMessage(e.target.value);
//   }

//   return (
//     <div className="chat">
//       <section className="Container">
//         {messages.map((message, index) => {
//           if (message.id === yourID) {
//             return (
//               <p className="MyRow" key={index}>
//                 <p>{message.body}</p>
//               </p>
//             );
//           }
//           return (
//             <p className="PartnerRow" key={index}>
//               <p>{message.body}</p>
//             </p>
//           );
//         })}
//       </section>
//       <form className="Form" onSubmit={sendMessage}>
//         <textarea
//           className="TextArea"
//           value={message}
//           onChange={handleChange}
//           placeholder="Say something..."
//         />
//         <button className="Button">Send</button>
//       </form>
//     </div>
//   );
// };

// export default App;

import React from "react";
import axios from "axios";
import { Component } from "react";
import MessageItem from "./MessageItem";
import AddMessage from "./AddMessage";
class Chat extends Component {
  state = {
    parentMessage: [],
  };

  getMessage() {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .get(`http://localhost:8080/messages?posterId=${this.props.id}`, {
        headers: {
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ parentMessage: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getMessage();
  }

  render() {
    return (
      <div>
        <AddMessage />
        <ul className="posters__list">
          {this.state.parentMessage.map((message, index) => (
            <MessageItem key={index} parentMessage={message} />
          ))}
        </ul>
      </div>
    );
  }
}
export default Chat;
