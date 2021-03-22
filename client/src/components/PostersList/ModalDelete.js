import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import close from "../../assets/Icons/close-24px.svg";

export default class posterAction extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  deleteButtonFunc = () => {
    const id = this.props.id;
    this.closeModal();
    this.props.delete(id);
  };

  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    const myPath = this.props.path;
    return (
      <div className={"action"}>
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
              {/* <h2 className="modal__head">{`Delete ${this.props.itemName} warehouse? `}</h2> */}
              <p className="modal__font lg">
                Please confirm that you'd like to delete this poster from the
                list.
                <br /> You won't be able to undo this action.
              </p>
            </div>
            <div className="modal__button-container">
              <button className="modal__button" onClick={this.closeModal}>
                Cancel
              </button>

              <Link to={myPath}>
                <button
                  className="modal__button modal__button-delete"
                  onClick={this.deleteButtonFunc}
                >
                  Delete
                </button>
              </Link>
            </div>
          </div>
        </Modal>
        <button onClick={this.openModal} className="action__delete">
          Delete
        </button>
      </div>
    );
  }
}