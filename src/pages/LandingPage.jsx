import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 
import { useEffect } from 'react';
import Footer from '../components/Footer';

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect (() =>{
  const revealElements = document.querySelectorAll('.fade-up, .fade-in');
  const handleScroll = () => {
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const trigger = window.innerHeight * 0.85;
      if(top<trigger){
        el.classList.add('show');
      }
    });
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  return() => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src="/images/logopark.jpg" className='logo1' alt='logo'/>
          <span className="company-name">EasyPark</span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/login" className="logs">Login</Link></li>
          <li><Link to="/register" className="reg">REGISTER</Link></li>
        </ul>
        <div className='menu-toogle' onClick={() => setMenuOpen(!menuOpen)}>
           ☰
        </div>
      </nav>

      <section className="hero fade-in">
        <div className='hero-overlay'>
        <h1 className='type'>Welcome to EasyPark</h1>
        <p>Secure, Fast, and Reliable Parking Management</p>
        <Link to="/register"><button className="btn">Get Started</button></Link>
        </div>
      </section>
      
      <section className="about fade-up">
        <div className="about-text">
          <h3 className="highlight">SMART PARKING MADE EASY</h3>
          <h1>Effortless parking at your fingertips</h1>
          <p>
            EasyPark revolutionizes the way you park in Lagos by providing a seamless parking management system. 
            With just a few clicks, you can book your parking slot online and make secure payments directly through our platform. 
            No more circling the block or worrying about finding a spot. Our user-friendly dashboard allows you to view available slots, 
            manage your profile, and enjoy a hassle-free parking experience. Embrace convenience and efficiency with EasyPark today!
          </p>
        </div>
        <div className="about-image">
          <img src="/images/background1.jpg" alt="Parking lot" />
        </div>
      </section>

      <section className="features fade-up">
        <h3 className="highlight">EFFORTLESS PARKING</h3>
        <h1>Book and pay for parking with ease.</h1>
        <div className="features-container">
          <div className="feature-card">
            <img src="/images/background2.jpg" alt="Feature 1" />
            <div className="feature-text">
              <h3>Online parking slot booking &gt;</h3>
              <p>Reserve your parking space effortlessly with EasyPark.</p>
            </div>
          </div>

          <div className="feature-card">
            <img src="/images/background3.jpg" alt="Feature 2" />
            <div className="feature-text">
              <h3>Seamless payment integration &gt;</h3>
              <p>Make secure payments with a click.</p>
            </div>
          </div>

          <div className="feature-card">
            <img src="/images/background4.jpg" alt="Feature 3" />
            <div className="feature-text">
              <h3>User-friendly dashboard &gt;</h3>
              <p>Manage your parking bookings with ease.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default LandingPage;
