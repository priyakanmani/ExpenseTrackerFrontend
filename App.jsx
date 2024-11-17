import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Expense from './components/ExpenseTracker';
import Income from './components/IncomeTracker';
import PieChart from "./components/PieChartComponent";
import Navbar from './components/Navbar'; // Ensure this is included if it's needed globally
import ExpenseChart from './components/ExpenseChart';
import LineChart from './components/LineChart';
import Savings from './components/SavingsPage';

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  // Check localStorage for authUser on initial load
  useEffect(() => {
    const storedAuthUser = localStorage.getItem('authUser');
    if (storedAuthUser) {
      try {
        setAuthUser(JSON.parse(storedAuthUser)); // Set the user state if data exists in localStorage
      } catch (error) {
        console.error('Error parsing authUser from localStorage:', error);
        setAuthUser(null); // Reset to null if parsing fails
      }
    }
  }, []);

  return (
    <Router>
      {/* Pass authUser to Navbar for display */}
      <Navbar authUser={authUser} setAuthUser={setAuthUser} />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setAuthUser={setAuthUser} />}
          />
          <Route
            path="/expense"
            element={<Expense authUser={authUser} />}
          />

          <Route
            path="/income"
            element={<Income authUser={authUser} />}
          />

          <Route path="/savings" element={<Savings />} />
          <Route path="/expenseChart" element={<ExpenseChart />} />
          <Route path="/piechart" element={<PieChart />} />

          <Route path="/linechart" element={<LineChart />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
