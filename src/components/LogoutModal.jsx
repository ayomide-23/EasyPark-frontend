import React from 'react';
import '../styles/logoutmodal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div className="logout-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Yes, Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
