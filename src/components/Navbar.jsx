import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="usernavbar">
      <div className="usernavbar-container">
        <Link to="/" className="usernavbar-logo">ParkEase</Link>

        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`usernav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
          <li><Link to="/book" onClick={toggleMenu}>Book Slot</Link></li>
          <li><Link to="/reservations" onClick={toggleMenu}>Reservations</Link></li>
          <li><Link to="/payment" onClick={toggleMenu}>Payment History</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/logout" className="logout-link" onClick={toggleMenu}>Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
