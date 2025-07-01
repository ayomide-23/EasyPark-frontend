import React, { useEffect, useState } from 'react';
import '../styles/payment.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('booking_time');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://easypark-backend-2toe.onrender.com/fetch_payments.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPayments(data.bookings);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter based on search and date
  const filtered = payments.filter((pay) => {
    const matchSearch =
      pay.slot_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.payment_reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate =
      (!dateRange.start || new Date(pay.booking_time) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(pay.booking_time) <= new Date(dateRange.end));

    return matchSearch && matchDate;
  });

  const totalSpent = filtered.reduce((sum, pay) => sum + parseInt(pay.amount), 0);

  // exporting as pdf
  const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text('Payment History', 14, 10);

  autoTable(doc, {
  head: [['#', 'Slot', 'Vehicle', 'Duration', 'Amount', 'Reference', 'Status', 'Date']],
  body: payments.map((pay, idx) => [
    idx + 1,
    pay.slot_number,
    pay.vehicle_type,
    pay.duration + ' hr',
    '₦' + pay.amount,
    pay.payment_reference,
    pay.status,
    new Date(pay.booking_time).toLocaleString()
  ]),
  startY: 20,
});

  doc.save('payment_history.pdf');
};

const sortedPayments = [...filtered].sort((a, b) => {
  if (sortKey === 'amount') return b.amount - a.amount;
  if (sortKey === 'booking_time') return new Date(b.booking_time) - new Date(a.booking_time);
  return a[sortKey].localeCompare(b[sortKey]);
});

  return (
    <div className="billing-container">
      <h2 className='billing-header'>Payment History</h2>

      {/* Mobile Sorting Dropdown */}
        <div className="mobile-sort">
         <label>Sort by:</label>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
             <option value="booking_time">Date</option>
             <option value="amount">Amount</option>
             <option value="status">Status</option>
             <option value="slot_number">Slot</option>
            </select>
        </div>
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search slot or reference"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>
      {/* Total summary */}
      <div className="summary">
        <strong>Total Spent:</strong> ₦{totalSpent}
      </div>
      <button onClick={handleExportPDF} className="export-btn">
         Export as PDF
        </button>
      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <table className="payment-grid">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Vehicle</th>
              <th>Duration</th>
              <th>Amount</th>
              <th>Reference</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='payment-card'>
            {sortedPayments.map((pay, idx) => (
              <tr key={idx}>
                <td data-label="Slot">{pay.slot_number}</td>
                <td data-label="Vehicle Type">{pay.vehicle_type}</td>
                <td data-label="Duration">{pay.duration} hr</td>
                <td data-label="Amount">NGN{pay.amount}</td>
                <td data-label="Reference">{pay.payment_reference}</td>
                <td data-label="Date">{new Date(pay.booking_time).toLocaleString()}</td>
                <td data-label="Status" className={`status ${pay.status.toLowerCase()}`}>{pay.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payment;
