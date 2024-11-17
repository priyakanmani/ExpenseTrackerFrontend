import React from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons
import './ExpenseList.css'; // Import the enhanced CSS file

const ExpenseList = ({ expenses, fetchExpenses, setEditingExpense }) => {
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Function to calculate total expense
    const calculateTotalExpense = () => {
        return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    };

    return (
        <div className="expense-list-container">
            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-details">
                            <span className="expense-name">{expense.username}</span>
                            <span className="expense-amount">${expense.amount}</span>
                            <span className="expense-date">{expense.date}</span>
                        </div>
                        <div className="expense-actions">
                            <button className="edit-btn" onClick={() => setEditingExpense(expense)}>
                                <FaEdit />
                            </button>
                            <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Display total expense */}
            <div className="total-expense">
                <strong>Total Expense: ${calculateTotalExpense().toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default ExpenseList;
