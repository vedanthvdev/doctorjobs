function DeleteConfirmationModal({
  deleteJobId,
  closeDeleteConfirmationModal,
  handleDelete,
}) {
  if (!deleteJobId) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Confirm Deleting the job</h4>
        <button id="close-delete-modal" onClick={closeDeleteConfirmationModal}>
          Close
        </button>
        <button id="confirm-delete-modal" onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
