import React, { useState } from 'react';
import '../styles/forgotpasswordmodal.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(1);

  const handleEmailSubmit = async () => {
    const res = await fetch('https://parkeasy.ct.ws/checkuseremail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email }),
    });

    const result = await res.json();
    if (result.success) {
      setStep(2); 
    } else {
      setFeedback("Email not found");
    }
  };

  const handleReset = async () => {
    const res = await fetch('https://parkeasy.ct.ws/reset_password.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, new_password: newPassword }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Password reset successful!");
      onClose();
    } else {
      setFeedback("Failed to reset password");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="forgot-overlay">
      <div className="forgot-modal">
        <h3>Reset Password</h3>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailSubmit}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleReset}>Reset Password</button>
          </>
        )}

        {feedback && <p className="feedback">{feedback}</p>}
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
