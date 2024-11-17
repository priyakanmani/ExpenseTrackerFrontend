// import React, { useEffect, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import './ExpenseChart.css';

// const ExpenseChart = () => {
//   const [barChartData, setBarChartData] = useState(null);

//   // Helper function to format dates
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
//     return `${day}.${month}.${year}`;
//   };

//   useEffect(() => {
//     // Fetch data for Bar chart
//     const fetchBarChart = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/expense_bar_chart');
//         const data = await response.json();
//         if (!data.message) {
//           // Format dates in the chart data
//           const formattedData = {
//             ...data,
//             data: data.data.map((trace) => ({
//               ...trace,
//               x: trace.x.map(formatDate), // Format each date in the x-axis
//             })),
//           };
//           setBarChartData(formattedData);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching Bar chart data:', error);
//       }
//     };

//     fetchBarChart();
//   }, []);

//   // Use Plotly to render Bar chart once the data is fetched
//   useEffect(() => {
//     if (barChartData) {
//       Plotly.newPlot('bar-chart', barChartData.data, barChartData.layout);
//     }
//   }, [barChartData]); // Only depend on barChartData

//   return (
//     <div>
      
//       <div>
//         <h2>Expenses by Date (Bar Chart)</h2>
//         <div id="bar-chart"></div>
//       </div>
//     </div>
//   );
// };

// export default ExpenseChart;


// import React, { useEffect, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import './ExpenseChart.css';

// const ExpenseChart = () => {
//   const [chartData, setChartData] = useState(null);

//   // Helper function to format dates
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
//     return `${day}.${month}.${year}`;
//   };

//   useEffect(() => {
//     // Fetch data for both expense and income
//     const fetchChartData = async () => {
//       try {
//         // Fetch expenses data
//         const expenseResponse = await fetch('http://localhost:5000/expense_bar_chart');
//         const expenseData = await expenseResponse.json();
//         if (expenseData.message) {
//           console.error(expenseData.message);
//           return;
//         }

//         // Fetch income data (assuming there is an endpoint for income similar to the expense one)
//         const incomeResponse = await fetch('http://localhost:5000/income_bar_chart');
//         const incomeData = await incomeResponse.json();
//         if (incomeData.message) {
//           console.error(incomeData.message);
//           return;
//         }

//         // Format dates and combine both data
//         const formattedExpenseData = expenseData.data.map((trace) => ({
//           ...trace,
//           x: trace.x.map(formatDate), // Format each date in the x-axis
//           name: 'Expense', // Label for the Expense data
//         }));

//         const formattedIncomeData = incomeData.data.map((trace) => ({
//           ...trace,
//           x: trace.x.map(formatDate), // Format each date in the x-axis
//           name: 'Income', // Label for the Income data
//         }));

//         // Combine the expense and income data
//         const combinedData = [...formattedExpenseData, ...formattedIncomeData];

//         // Update state with the combined data
//         setChartData({
//           data: combinedData,
//           layout: {
//             title: 'Income vs Expense by Date',
//             barmode: 'group', // Display bars next to each other
//             xaxis: {
//               title: 'Date',
//             },
//             yaxis: {
//               title: 'Amount',
//             },
//           },
//         });
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       }
//     };

//     fetchChartData();
//   }, []);

//   // Use Plotly to render the combined chart once the data is fetched
//   useEffect(() => {
//     if (chartData) {
//       Plotly.newPlot('bar-chart', chartData.data, chartData.layout);
//     }
//   }, [chartData]);

//   return (
//     <div>
//       <h2>Income vs Expense by Date (Bar Chart)</h2>
//       <div id="bar-chart"></div>
//     </div>
//   );
// };

// export default ExpenseChart;



import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';
import './ExpenseChart.css';

const ExpenseChart = () => {
  const [chartData, setChartData] = useState(null);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    // Fetch data for both expense and income
    const fetchChartData = async () => {
      try {
        // Fetch expenses data
        const expenseResponse = await fetch('http://localhost:5000/expense_bar_chart');
        const expenseData = await expenseResponse.json();
        if (expenseData.message) {
          console.error(expenseData.message);
          return;
        }

        // Fetch income data (assuming there is an endpoint for income similar to the expense one)
        const incomeResponse = await fetch('http://localhost:5000/income_bar_chart');
        const incomeData = await incomeResponse.json();
        if (incomeData.message) {
          console.error(incomeData.message);
          return;
        }

        // Format dates and combine both data
        const formattedExpenseData = expenseData.data.map((trace) => ({
          ...trace,
          x: trace.x.map(formatDate), // Format each date in the x-axis
          name: 'Expense', // Label for the Expense data
          marker: {
            color: 'red', // Red color for expenses
          },
        }));

        const formattedIncomeData = incomeData.data.map((trace) => ({
          ...trace,
          x: trace.x.map(formatDate), // Format each date in the x-axis
          name: 'Income', // Label for the Income data
          marker: {
            color: 'green', // Green color for income
          },
        }));

        // Combine the expense and income data
        const combinedData = [...formattedExpenseData, ...formattedIncomeData];

        // Update state with the combined data
        setChartData({
          data: combinedData,
          layout: {
            title: 'Income vs Expense by Date',
            barmode: 'group', // Display bars next to each other
            xaxis: {
              title: 'Date',
            },
            yaxis: {
              title: 'Amount',
            },
          },
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  // Use Plotly to render the combined chart once the data is fetched
  useEffect(() => {
    if (chartData) {
      Plotly.newPlot('bar-chart', chartData.data, chartData.layout);
    }
  }, [chartData]);

  return (
    <div>
      <h2>Income vs Expense by Date (Bar Chart)</h2>
      <div id="bar-chart"></div>
    </div>
  );
};

export default ExpenseChart;
