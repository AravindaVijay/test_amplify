import React from 'react';
import './modal.css';

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>File Content</h3>
        <div className="file-content">
          <pre>{content}</pre>
        </div>
      </div>
    </div>
  );
}

export default Modal;
