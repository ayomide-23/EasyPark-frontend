import React, { useEffect, useState } from 'react';
import '../styles/reservations.css';

const Reservations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('https://easypark.atwebpages.com/reservations.php', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookings(data.bookings);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (bookingId) => {
  const confirm = window.confirm("Are you sure you want to cancel this booking?");
  if (!confirm) return;

  try {
    const res = await fetch('https://easypark.atwebpages.com/cancel_booking.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ booking_id: bookingId })
    });

    const result = await res.json();
    if (result.success) {
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
      );
      alert("Booking cancelled successfully");
    } else {
      alert("Failed to cancel booking");
    }
  } catch (err) {
    console.error("Cancel error:", err);
    alert("Error cancelling booking");
  }
};
  const filteredBookings =
    filterStatus === 'All'
      ? bookings
      : bookings.filter(b => b.status === filterStatus);

  return (
    <div className="reservations-container">
      <h2>Your Reservations</h2>

      <div className="filter-section">
        <label>Filter by status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p>No bookings found for this filter.</p>
      ) : (
        <div className="booking-list">
          {filteredBookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <h4>Slot: {booking.slot_number}</h4>
              <p><strong>Vehicle:</strong> {booking.vehicle_type}</p>
              <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
              <p><strong>Amount:</strong> NGN{booking.amount}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {booking.status !== 'Cancelled' && (
              <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>
                 Cancel Booking
              </button>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;

