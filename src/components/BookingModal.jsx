import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import '../styles/bookingmodal.css';

const BookingModal = ({ slot, onClose, user }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [hours, setHours] = useState(1);
  const [price, setPrice] = useState(0);

  const vehicleFees = {
    car: 100,
    truck: 200,
    motorcycle: 50,
    bus:150,
    van: 200,
    bicycle: 20
  };

  const baseSlotFee = 500;

  useEffect(() => {
    const fee = vehicleFees[vehicleType] || 0;
    setPrice(baseSlotFee + fee + (hours * 50));
  }, [vehicleType, hours]);

  const email = user?.email; 
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const componentProps = {
    email,
    amount: price * 100, 
    metadata: {
      slot_id: slot.slot_number,
      vehicle_type: vehicleType,
      hours
    },
    publicKey,
    text: 'Pay Now',
     onSuccess: (reference) => handlePaystackSuccess(reference),
    onClose: () => {
      alert('Payment closed.');
    }
  };

   const handlePaystackSuccess = async (reference) => {
    try {
      const res = await fetch("https://easypark.atwebpages.com/update_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ slot_number: slot.slot_number }),
      });
      
   await fetch("https://easypark.atwebpages.com/store_bookings.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        user_id: user.id,
        slot_id: slot.slot_number,
        vehicle_type: vehicleType,
        duration: hours,
        amount: price,
        payment_reference: reference.reference
      })
    });

      const result = await res.json();
      if (result.success) {
        alert("Slot booked!");
        window.location.reload();
      } else {
        alert("Payment succeeded but failed to update slot.");
      }
    } catch (err) {
      console.error("Error updating slot:", err);
      alert("Something went wrong while finalizing the booking.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book Slot: {slot.slot_number}</h2>

        <label>Vehicle Type:</label>
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="bicycle">Bicycle</option>
          <option value="bus">Bus</option>
          <option value="van">Van</option>
       </select>

        <label>Hours:</label>
        <input
          type="number"
          min="1"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <p><strong>Total: NGN{price}</strong></p>

        {vehicleType && hours > 0 && (
          <PaystackButton className="paystack-button" {...componentProps} onSuccess={handlePaystackSuccess} />
        )}

        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BookingModal;
