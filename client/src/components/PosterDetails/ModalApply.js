import React, { Component } from "react";
import Modal from "react-modal";
import close from "../../assets/Icons/close-24px.svg";


export default class ModalApply extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <div>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <div className="modal__container">
            {/* <button onClick={this.closeModal}>
              <img className="modal__icon" src={close} alt="close"></img>
            </button> */}
            <div className="modal__content">
              <p className="modal__font lg">
                Congratulations! you successfully applied for this job post.
                <br /> You will recive a confirmation email shortly.
              </p>
            </div>
            <div className="modal__button-container">
              <button
                onClick={this.closeModal}
                className="modal__button modal__button-delete"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <button onClick={this.openModal} className="apply-button">
          APPLY
        </button>
      </div>
    );
  }
}
