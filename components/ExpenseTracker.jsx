import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList/ExpenseList';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import './ExpenseTracker.css'; // Import the CSS for styling

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses when the component mounts
  const fetchExpenses = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:5000/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Call fetchExpenses when the component mounts
  }, []); // Empty dependency array means it only runs on mount

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="expense-tracker-container">
      <h1 className="tracker-title">Expense Tracker</h1>
      <div className="tracker-sections">
        <ExpenseForm
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
          fetchExpenses={fetchExpenses} // Pass fetchExpenses as a prop
        />
        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses} // Pass fetchExpenses as a prop
          setEditingExpense={setEditingExpense}
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;
