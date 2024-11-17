import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseForm.css';

const ExpenseForm = ({ editingExpense, fetchExpenses, setEditingExpense }) => {
    const [username, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Populate form fields when an expense is being edited
    useEffect(() => {
        if (editingExpense) {
            setName(editingExpense.username);
            setAmount(editingExpense.amount);
            setDate(editingExpense.date);
        }
    }, [editingExpense]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExpense = { username, amount, date };

        try {
            setIsLoading(true); // Set loading state to true
            if (editingExpense) {
                await axios.put(`http://localhost:5000/expenses/${editingExpense.id}`, newExpense);
                setEditingExpense(null); 
                setMessage('Expense updated successfully!');
                setMessageType('success');
            } else {
                await axios.post('http://localhost:5000/expenses', newExpense);
                setMessage('Expense added successfully!');
                setMessageType('success');
            }
            setName('');
            setAmount('');
            setDate('');
            fetchExpenses();
        } catch (error) {
            console.error('Error saving expense:', error);
            setMessage('Error saving expense. Please try again.');
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
        <div className="expense-form-container">
            <form onSubmit={handleSubmit} className="expense-form">
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
                    {isLoading ? 'Saving...' : editingExpense ? 'Update Expense' : 'Add Expense'}
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

export default ExpenseForm;

