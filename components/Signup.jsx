import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Signup.css'; // Import custom CSS for better styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/signup', { username, password });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Error signing up. Try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h4>Create Account</h4>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account?{' '}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
