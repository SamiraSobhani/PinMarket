import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import close from "../../assets/Icons/close-24px.svg";
import Axios from "axios";

export default class posterAction extends Component {
  state = {
    modalIsOpen: false,
    usernameReg: "",
    passwordReg: "",
    registerStatus: "",
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.register();
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  };

  deleteButtonFunc = () => {
    this.closeModal();
  };
  register = () => {
    Axios.post("http://localhost:8080/register", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
    }).then((response) => {
      console.log(response);
      this.setState({ registerStatus: response.data });
    });
  };
  changeHandle = (e) => {
    this.setState({ usernameReg: e.target.value });
    console.log(this.state.usernameReg);
  };
  handleChange = (e) => {
    this.setState({ passwordReg: e.target.value });
  };

  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <div className="registration regModal">
        <div className="registration " id="myForm">
          <h1>Registration</h1>
          <label>Username</label>
          <input id="username" type="text" onChange={this.changeHandle} />
          <label>Password</label>
          <input id="password" type="password" onChange={this.handleChange} />
        </div>
        <div className="action">
          <Modal
            className="modal"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <div className="modal__container">
              <button onClick={this.closeModal}>
                <img className="modal__icon" src={close} alt="close"></img>
              </button>
              <div className="modal__content">
                <p className="modal__font lg">
                  Congratulations!!! now you are part of PinPal family. Please
                  log in to start your journey.
                </p>
              </div>
              <div className="modal__button-container">
                <Link to={"/"}>
                  <button
                    className="modal__button modal__button-delete"
                    onClick={this.closeModal}
                  >
                    OK!
                  </button>
                </Link>
              </div>
            </div>
          </Modal>
          <button onClick={this.openModal}>Register</button>
        </div>
      </div>
    );
  }
}
