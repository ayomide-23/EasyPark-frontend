import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/custom.css';
import ForgotPasswordModal from '../components/ForgotpasswordModal';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState('')
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://easypark-backend-2toe.onrender.com/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        // if (data.role === 'admin') {
        //   navigate('/AdminDashboard');
        // } else {
        //   navigate('/UserDashboard');
        // }
         navigate("/UserDashboard");
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
  <div className="login-card">
    <h2>Login</h2>
    {error && <div style={{color: 'red'}}>{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="password" className="form-label">Password:</label>
        <input 
          type={showPassword ? 'text' : 'password'} 
          className="form-control" 
          id="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <ForgotPasswordModal isOpen={showForgot} onClose={() => setShowForgot(false)} />
      <p onClick={() => setShowForgot(true)} className='forgot-link'>Forgot Password?</p>

      <button type="submit" className="btn btn-primary w-100">Login</button>
      <p>Already have an account? <a href="/register">Register</a></p>
    </form>
  </div>
</div>

  );
};

export default Login;
