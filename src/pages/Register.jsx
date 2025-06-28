import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/register.css'; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    vehicleno: '',
    vehiclecol: '',
    vehicletype: '',
    password: '',
    confirm_password: ''
  });
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://easypark.atwebpages.com/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      alert("Registration successful");
      navigate('/UserDashboard')
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while registering.");
  }
};
  return (
    <div className="register-wrapper">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="full_name" className="form-label">Full Name:</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          placeholder='Enter full name'
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="form-label">Email:</label>
        <input
          className="form-control" 
          type="email"
          id="email"
          name="email"
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone" className="form-label">Phone Number:</label>
        <input
          className="form-control" 
          type="tel"
          id="phone"
          name="phone"
          placeholder='Enter a valid phone number'
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="vehicleno" className="form-label">Vehicle Number:</label>
        <input
          className="form-control" 
          type="text"
          id="vehicleno"
          name="vehicleno"
          placeholder='Enter vehicle number'
          value={formData.vehicleno}
          onChange={handleChange}
          required
        />
        <label htmlFor="vehiclecol" className='form-label'>Vehicle Colour:</label>
        <input 
          type="text"
          className='form-control'
          id='vehiclecol'
          name='vehiclecol'
          placeholder='Enter the colour of your vehicle'
          value={formData.vehiclecol}
          onChange={handleChange}
          required
         />
         <label htmlFor="vehicletype" className='form-label'>Vehicle Type:</label>
         <select 
          name="vehicletype" 
          id="vehicletype" 
          className='custom-select' 
          value={formData.vehicletype}
          onChange={handleChange}
          required>
          <option value="disable selected hidden">Select vehicle type</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
          <option value="bicycle">Bicycle</option>
         </select>
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          className="form-control" 
          type="password"
          id="password"
          name="password"
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
        <input
          className="form-control" 
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder='Re-enter password'
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Register;
