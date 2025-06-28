import React, { useEffect, useState } from 'react';
import '../styles/notification.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://easypark.atwebpages.com/fetch_notifications.php', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotifications(data.notifications);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await fetch('http://easypark.atwebpages.com/mark_notifications.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id }),
      });

      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, status: 'read' } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this notification?");
    if (!confirm) return;

    try {
      await fetch('http://easypark.atwebpages.com/delete_notification.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id }),
      });

      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };


  const filtered = notifications.filter(n => {
    if (filter === 'All') return true;
    return n.status === filter.toLowerCase();
  });

  return (
    <div className="notifications-container">
      <div className="notification-header">
        <h2>Notifications</h2>
      </div>
      <div className="filter-bar">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Unread</option>
          <option>Read</option>
        </select>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : filtered.length === 0 ? (
        <p>No notifications to show.</p>
      ) : (
        <div className="notification-list">
          {filtered.map((note) => (
            <div key={note.id} className={`notification-card ${note.status}`}>
              <p className="message">{note.message}</p>
              <small>{new Date(note.created_at).toLocaleString()}</small>
              <div className="actions">
                {note.status === 'unread' && (
                  <button onClick={() => handleMarkAsRead(note.id)}>Mark as Read</button>
                )}
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
