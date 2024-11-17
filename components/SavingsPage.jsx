

// import React, { useEffect, useState } from 'react';
// import './SavingsPage.css';

// const SavingsPage = () => {
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [savings, setSavings] = useState(0);
//   const [incomeData, setIncomeData] = useState([]);
//   const [expenseData, setExpenseData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch Income Data
//         const incomeResponse = await fetch('http://localhost:5000/incomes_line');
//         const incomes = await incomeResponse.json();
//         setIncomeData(incomes);

//         // Fetch Expense Data
//         const expenseResponse = await fetch('http://localhost:5000/expenses_line');
//         const expenses = await expenseResponse.json();
//         setExpenseData(expenses);
//       } catch (error) {
//         console.error('Error fetching data:', error);   
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const totalIncomeAmount = incomeData.reduce((total, income) => total + income.amount, 0);
//     const totalExpenseAmount = expenseData.reduce((total, expense) => total + expense.amount, 0);
//     const totalSavings = totalIncomeAmount - totalExpenseAmount;

//     setTotalIncome(totalIncomeAmount);
//     setTotalExpense(totalExpenseAmount);
//     setSavings(totalSavings);
//   }, [incomeData, expenseData]);

//   return (
//     <div className="savings-container">
//       <h4>Savings Summary</h4>

//       <div className="cards-container1">
//         {/* Income Card */}
//         <div className="card income-card">
//           <div className="icon">
//             <i className="fas fa-wallet"></i> {/* Income Icon */}
//           </div>
//           <strong>Total Income</strong>
//           <div className="amount">₹{totalIncome.toFixed(2)}</div>
//         </div>

//         {/* Expense Card */}
//         <div className="card expense-card">
//           <div className="icon">
//             <i className="fas fa-credit-card"></i> {/* Expense Icon */}
//           </div>
//           <strong>Total Expense</strong>
//           <div className="amount">₹{totalExpense.toFixed(2)}</div>
//         </div>
//       </div>

//       {/* Savings Card */}
//       <div className="card savings-card">
//         <div className="icon">
//           <i className="fas fa-piggy-bank"></i> {/* Savings Icon */}
//         </div>
//         <strong>Savings</strong>
//         <div className="amount">₹{savings.toFixed(2)}</div>
//       </div>
//     </div>
//   );
// };

// export default SavingsPage;




import React, { useEffect, useState } from 'react';

const SavingsPage = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [savings, setSavings] = useState(0);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Income Data
                const incomeResponse = await fetch('http://localhost:5000/incomes_line');
                const incomes = await incomeResponse.json();
                setIncomeData(incomes);

                // Fetch Expense Data
                const expenseResponse = await fetch('http://localhost:5000/expenses_line');
                const expenses = await expenseResponse.json();
                setExpenseData(expenses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const totalIncomeAmount = incomeData.reduce((total, income) => total + income.amount, 0);
        const totalExpenseAmount = expenseData.reduce((total, expense) => total + expense.amount, 0);
        const totalSavings = totalIncomeAmount - totalExpenseAmount;

        setTotalIncome(totalIncomeAmount);
        setTotalExpense(totalExpenseAmount);
        setSavings(totalSavings);
    }, [incomeData, expenseData]);

    return (
        <div className="savings-container">
            <h4>Savings Summary</h4>

            <div className="cards-container1">
                {/* Income Card */}
                <div className="card income-card">
                    <div className="icon">
                        <i className="fas fa-wallet"></i> {/* Income Icon */}
                    </div>
                    <strong>Total Income</strong>
                    <div className="amount">₹{totalIncome.toFixed(2)}</div>
                </div>

                {/* Expense Card */}
                <div className="card expense-card">
                    <div className="icon">
                        <i className="fas fa-credit-card"></i> {/* Expense Icon */}
                    </div>
                    <strong>Total Expense</strong>
                    <div className="amount">₹{totalExpense.toFixed(2)}</div>
                </div>
            </div>

            {/* Savings Card */}
            <div className="card savings-card">
                <div className="icon">
                    <i className="fas fa-piggy-bank"></i> {/* Savings Icon */}
                </div>
                <strong>Savings</strong>
                <div className="amount">₹{savings.toFixed(2)}</div>
            </div>

            {/* Internal CSS Styles */}
            <style>{`
        .savings-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 40px;
          text-align: center;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          background-image: url('https://en.idei.club/uploads/posts/2023-06/1686316617_en-idei-club-p-home-investment-dizain-krasivo-1.jpg');
          background-size: cover;
          background-position: center;
          padding: 0px;
          border-radius: 0px;
          min-height: 80vh; /* Increased the minimum height */

          display: flex;
          justify-content: center; 
          align-items: center;     
          background-image: url('https://en.idei.club/uploads/posts/2023-06/1686316617_en-idei-club-p-home-investment-dizain-krasivo-1.jpg'); /* Add background image */
          background-size: cover;  /* Ensures the background image covers the entire container */
          background-position: center; /* Centers the background image */
          background-repeat: no-repeat; /* Prevents the image from repeating */
  
          min-height: 100vh; /* Ensures the container takes up the full viewport height */
          font-family: 'Roboto', sans-serif; /* Apply the font */
          color: white; /* Optional: Make text more visible depending on your background */
          text-align: center; /* Centers text content */
        }

        h4 {
          font-size: 30px;
          font-weight: bold;
          color: #1d3557;
          margin-bottom: 30px;
        }

        .cards-container1 {
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          gap: 20px;
          margin-bottom: 30px;
          max-width: 1200px;
        }

        .card {
          background-color: #fff;
          border-radius: 12px;
          padding: 30px;
          width: 280px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          text-align: center;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
        }

        .card strong {
          font-size: 20px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .amount {
          font-size: 30px;
          font-weight: 600;
          color: #2a9d8f;
          margin-top: 15px;
          line-height: 1.2;
        }

        .card .icon {
          font-size: 40px;
          margin-bottom: 15px;
          color: #333;
        }

        .income-card {
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid #00796b;
        }

        .expense-card {
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid #d32f2f;
        }

        .savings-card {
          background-color: rgba(255, 255, 255, 0.8);
          width: 450px;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          margin-top: 40px;
          transition: all 0.3s ease-in-out;
        }

        .savings-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .savings-card strong {
          font-size: 24px;
          color: #333;
          text-transform: uppercase;
        }

        .savings-card .amount {
          font-size: 34px;
          font-weight: 700;
          color: #1d3557;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .cards-container1 {
            flex-direction: column;
            align-items: center;
          }

          .card {
            width: 85%;
            margin-bottom: 25px;
          }

          .savings-card {
            width: 85%;
            margin-top: 30px;
          }

          h4 {
            font-size: 28px;
            margin-bottom: 20px;
          }
        }

        @media (max-width: 1024px) {
          .cards-container1 {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .card {
            width: 80%;
          }

          .savings-card {
            width: 80%;
          }
        }
      `}</style>
        </div>
    );
};

export default SavingsPage;
