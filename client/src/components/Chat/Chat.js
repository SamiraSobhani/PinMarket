
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
