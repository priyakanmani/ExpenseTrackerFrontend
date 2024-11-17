import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css'; // Import custom CSS for better styling

const Login = ({ setAuthUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      setAuthUser(response.data.user);
      localStorage.setItem('authUser', JSON.stringify(response.data.user));
      navigate('/expense');
    } catch (error) {
      alert('Error logging in. Try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h4>Login</h4>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <a href="/signup" className="signup-link">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
