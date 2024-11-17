import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-page">
      <div className="card">
        <div className="profile-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvVFkxvOGN8GWn20cZphc2822XbYr6-QKW2v_YkGmoWKFx0y223av9s46wSRSmge9yTk&usqp=CAU"
            alt="Profile Icon"
            className="profile-icon"
          />
          <h2 className="profile-name">Welcome to Expense Tracker</h2>
        </div>

        <p className="description">Your personal finance assistant. Track your expenses easily!</p>

        <div className="button-container">
          <button onClick={handleLoginClick} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

