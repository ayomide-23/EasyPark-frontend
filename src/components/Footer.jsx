import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer fade-in">
      <div className="footer-content">
        <h2>EasyPark</h2>

        <div className="social-icons">
          <a href="https://wa.me/2347013841793"><i className="fab fa-whatsapp"></i></a>
          <a href="https://x.com/ayomide_aap"><i className="fab fa-x"></i></a>
          <a href="https://instagram.com/only_heishim"><i className="fab fa-instagram"></i></a>
          <a href="https://github.com/ayomide-23"><i className="fab fa-github"></i></a>
        </div>

        <p>© {new Date().getFullYear()} EasyPark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
