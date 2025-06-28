
import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal';
import '../styles/slotgrid.css';

const SlotGrid = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    // Fetch slots
    fetch('https://easypark.atwebpages.com/fetch_slots.php')
      .then(res => res.json())
      .then(data => {
        console.log('Slots fetched:', data); 
        if (data.success) {
          setSlots(data.slots);
        } else {
          console.warn("Failed to load slots:", data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
      });

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found for user");
      return;
    }
    // fetch user detials
    fetch('https://easypark.atwebpages.com/fetch_details.php', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('User fetched:', data); 
        if (data.success) {
          setUserdata(data.user);
        }
      })
      .catch(err => {
        console.error("Error fetching user:", err);
      });
  }, []);

  const handleSlotClick = (slot) => {
    if (!slot.booked) {
      setSelectedSlot(slot);
      setShowModal(true);
    }
  };
  return (
    <div className="slot-grid">
      <h2>Available Slots</h2>

      {slots.length === 0 ? (
        <p>Loading slots...</p>
      ) : (
        slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${slot.booked ? 'booked' : 'available'}`}
            onClick={() => handleSlotClick(slot)}
          >
            <span style={{display: 'block'}}>{slot.slot_number}</span>
            <span style={{display: 'blocked', marginTop: '5px', }}>
              {slot.booked ? "Booked" : "Available"}</span>
          </div>
        ))
      )}

      {showModal && selectedSlot && userdata && (
        <BookingModal
          slot={selectedSlot}
          user={userdata}
          onClose={() => {
            setShowModal(false);
            setSelectedSlot(null);
          }}
        />
      )}
    </div>
  );
};

export default SlotGrid;
