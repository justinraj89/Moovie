import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./RemoveFromWatchlistModal.css";
import { CloseButton } from "react-bootstrap";

function RemoveFromWathlistModal({ showModal, handleCloseModal, handleConfirmRemove, movieToRemove}) {
    console.log(movieToRemove)
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered className="remove-modal">
    <Modal.Header className="modal-title">
      <Modal.Title >Confirm Removal</Modal.Title>
      <CloseButton variant="white" onClick={handleCloseModal}/>
    </Modal.Header>
    <Modal.Body>Are you sure you want to remove <span className="movie-title">{movieToRemove?.movieTitle}</span> from your watchlist?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirmRemove}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default RemoveFromWathlistModal