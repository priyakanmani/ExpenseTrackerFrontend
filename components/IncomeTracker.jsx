


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeList from './IncomeList/IncomeList';
import IncomeForm from './IncomeForm/IncomeForm';
import './IncomeTracker.css'; // Import the CSS for styling

const IncomeTracker = () => {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);

  // Fetch expenses when the component mounts
  const fetchIncomes = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:5000/incomes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  useEffect(() => {
    fetchIncomes(); // Call fetchExpenses when the component mounts
  }, []); // Empty dependency array means it only runs on mount

  const handleAddIncome = (income) => {
    setIncomes([...incomes, income]);
  };

  return (
    <div className="income-tracker-container">
      <h1 className="tracker-title">Income Tracker</h1>
      <div className="tracker-sections">
        <IncomeForm
          editingIncome={editingIncome}
          setEditingIncome={setEditingIncome}
          fetchIncomes={fetchIncomes} // Pass fetchExpenses as a prop
        />
        <IncomeList
          incomes={incomes}
          fetchIncomes={fetchIncomes} // Pass fetchExpenses as a prop
          setEditingIncome={setEditingIncome}
        />
      </div>
    </div>
  );
};

export default IncomeTracker;
