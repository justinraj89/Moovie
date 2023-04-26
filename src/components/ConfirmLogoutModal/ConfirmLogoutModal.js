import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ConfirmLogoutModal.css";
import { CloseButton } from "react-bootstrap";

function ConfirmLogoutModal({ showModal, handleCloseModal, handleConfirmLogout }) {

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered className="remove-modal">
    <Modal.Header className="modal-title">
      <Modal.Title >Confirm Logout</Modal.Title>
      <CloseButton variant="white" onClick={handleCloseModal}/>
    </Modal.Header>
    <Modal.Body>Are you sure you want to logout?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirmLogout}>
        Logout
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ConfirmLogoutModal