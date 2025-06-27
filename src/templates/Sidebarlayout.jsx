import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/sidebar.css';
import LogoutModal from "../components/LogoutModal";
import { useNavigate } from "react-router-dom";

const Sidebarlayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [active, setActive] = useState('');
  const [unreadCount, setUnreadCount] = useState('')
  const [darkmode, setDarkmode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);


  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate('/login');
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost/PMS/unread_count.php", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setUnreadCount(data.count);
      }
    });
}, []);


  const toggleDarkMode = () => {
    setDarkmode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-head">
        <h2 className="sidebar-title">EasyPark</h2>
      </div>
      <ul className="sidebar-list">
        <li className={active === '/UserDashboard' ? 'active' : ''}>
          <Link to="/UserDashboard"><i className="fas fa-home"></i><span>Dashboard</span></Link>
        </li>
        <li className={active === '/SlotGrid' ? 'active' : ''}>
          <Link to="/SlotGrid"><i className="fas fa-car"></i><span>Parking Slots</span></Link>
        </li>
        <li className={active === '/Reservations' ? 'active' : ''}>
          <Link to="/Reservations"><i className="fas fa-calendar-check"></i><span> Reservations</span></Link>
        </li>
        <li className={active === '/Payment' ? 'active' : ''}>
          <Link to="/Payment"><i className="fas fa-credit-card"></i><span>Payment</span></Link>
        </li>
        {/* <li className={active === '/Notifications' ? 'active' : ''}>
          <Link to="/Notifications"><i className="fas fa-bell"></i><span>Notifications</span></Link>
        </li> */}
        <li className={active === '/Notifications' ? 'active' : ''}>
         <Link to="/Notifications" className="notification-link">
           <div className="icon-wrapper">
             <i className="fas fa-bell"></i>
            </div>
           <span>Notifications</span>
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </Link>
        </li>
        <li onClick={() => setShowLogoutModal(true)} style={{color: 'green'}}>
         <i className="fas fa-sign-out-alt"></i><span className="log">Logout</span>
        </li>
      </ul>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={darkmode} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{darkmode ? 'Dark mode' : 'Light mode'}</span>
      </div>
    </div>
  );
};

export default Sidebarlayout;
