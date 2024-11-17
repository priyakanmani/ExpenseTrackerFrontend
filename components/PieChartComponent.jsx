// import React from 'react';
// // Import the ExpenseChart component
// import ExpenseChart from './ExpenseChart';
// import './PieChartComponent.css';

// const PieChartComponent = () => {
//   return (
//     <div className="pie-chart-container">
//       <ExpenseChart />
//     </div>
//   );
// };

// export default PieChartComponent;


import React from 'react';
// Import the ExpenseChart component
import ExpenseChart from './ExpenseChart';
import './PieChartComponent.css';

const PieChartComponent = () => {
  // Example data for the pie chart
  const expenseData = {
    labels: ['Food', 'Rent', 'Utilities', 'Entertainment'],
    datasets: [
      {
        data: [400, 1000, 200, 150],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF5A5E', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h2>Expense Breakdown</h2>
      <ExpenseChart data={expenseData} />
    </div>
  );
};

export default PieChartComponent;
