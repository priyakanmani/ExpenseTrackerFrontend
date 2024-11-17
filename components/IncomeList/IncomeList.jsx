import React from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons
import './IncomeList.css'; // Import the enhanced CSS file

const IncomeList = ({ incomes, fetchIncome, setEditingIncome }) => {
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/incomes/${id}`);
            fetchIncome();
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    // Function to calculate total expense
    const calculateTotalIncome = () => {
        return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
    };

    return (
        <div className="income-list-container">
            <ul className="income-list">
                {incomes.map((income) => (
                    <li key={income.id} className="income-item">
                        <div className="income-details">
                            <span className="income-name">{income.username}</span>
                            <span className="income-amount">${income.amount}</span>
                            <span className="income-date">{income.date}</span>
                        </div>
                        <div className="income-actions">
                            <button className="edit-btn" onClick={() => setEditingIncome(income)}>
                                <FaEdit />
                            </button>
                            <button className="delete-btn" onClick={() => deleteIncome(income.id)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Display total expense */}
            <div className="total-income">
                <strong>Total Income: ${calculateTotalIncome().toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default IncomeList;
