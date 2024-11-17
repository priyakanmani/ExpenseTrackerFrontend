import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncomeForm.css';

const IncomeForm = ({ editingIncome, fetchIncomes, setEditingIncome }) => {
    const [username, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Populate form fields when an expense is being edited
    useEffect(() => {
        if (editingIncome) {
            setName(editingIncome.username);
            setAmount(editingIncome.amount);
            setDate(editingIncome.date);
        }
    }, [editingIncome]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newIncome = { username, amount, date };

        try {
            setIsLoading(true); // Set loading state to true
            if (editingIncome) {
                await axios.put(`http://localhost:5000/incomes/${editingIncome.id}`, newIncome);
                setEditingIncome(null); 
                setMessage('Income updated successfully!');
                setMessageType('success');
            } else {
                await axios.post('http://localhost:5000/incomes', newIncome);
                setMessage('Expense added successfully!');
                setMessageType('success');
            }
            setName('');
            setAmount('');
            setDate('');
            fetchIncomes();
        } catch (error) {
            console.error('Error saving income:', error);
            setMessage('Error saving income. Please try again.');
            setMessageType('error');
        } finally {
            setIsLoading(false); // Set loading state to false
        }

        // Clear message after a few seconds
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

    return (
        <div className="income-form-container">
            <form onSubmit={handleSubmit} className="income-form">
                <input 
                    type="text" 
                    placeholder="Purpose" 
                    value={username} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : editingIncome ? 'Update Income' : 'Add Income'}
                </button>
            </form>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default IncomeForm;

