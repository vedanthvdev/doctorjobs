function ContactModal({ contact, closeModal }) {
  if (!contact) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Contact Details</h4>
        {contact.email && <p>Email: {contact.email}</p>}
        {contact.phone && <p>Phone: {contact.phone}</p>}
        <button id="close-modal" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ContactModal;
