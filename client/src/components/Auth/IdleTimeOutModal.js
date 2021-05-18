import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default class IdleTimeOutModal extends Component {
  deleteButtonFunc = () => {
    this.props.handleLogout;
  };

  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <div className="action">
        <Modal
          isOpen={this.props.showModal}
          className="modal"
          // show={this.props.showModal}
        >
          <div className="modal__container">
            <div className="modal__content">
              <p className="modal__font lg">
                You Will Get Timed Out. You want to stay?
              </p>
            </div>
            <div className="modal__button-container">
              <button
                className="modal__button cancelButton"
                onClick={this.props.handleLogout}
              >
                Logout
              </button>

              <Link to={"/posters"}>
                <button
                  className="modal__button modal__button-delete"
                  onClick={(this.props.closeModal, this.props.stayHandle)}
                >
                  Stay
                </button>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

// import React from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// export const IdleTimeOutModal = ({showModal, handleClose, handleLogout, remainingTime}) => {

//     return (
//         <Modal show={showModal} onHide={handleClose}>
//             <Modal.Header closeButton>
//             <Modal.Title>You Have Been Idle!</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>You Will Get Timed Out. You want to stay?</Modal.Body>
//             <Modal.Footer>
//             <Button variant="danger" onClick={handleLogout}>
//                 Logout
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//                 Stay
//             </Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }
