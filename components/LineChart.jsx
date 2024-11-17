// import React, { useEffect, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import './LineChart.css';  // Import the CSS file

// const LineChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [year, setYear] = useState(''); // State to store the selected year
//   const [month, setMonth] = useState(''); // State to store the selected month
//   const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/expenses_line'); // Backend endpoint
//         const data = await response.json();
//         setFilteredData(data); // Store all data initially
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   useEffect(() => {
//     // Filter data based on the selected year and month
//     const filteredExpenses = filteredData.filter((expense) => {
//       const [expenseYear, expenseMonth] = expense.date
//         ? expense.date.split('-')
//         : [];
//       const matchesYear = year ? expenseYear === year : true;
//       const matchesMonth = month ? expenseMonth === month : true;
//       return matchesYear && matchesMonth;
//     });

//     // Prepare data for Plotly
//     const dates = filteredExpenses.map((expense) => expense.date);
//     const amounts = filteredExpenses.map((expense) => expense.amount);

//     const lineChartData = [
//       {
//         x: dates,
//         y: amounts,
//         type: 'scatter',
//         mode: 'lines+markers',
//         marker: { color: 'blue' },
//       },
//     ];

//     const layout = {
//       title: 'Expenses Over Time',
//       xaxis: { title: 'Date' },
//       yaxis: { title: 'Amount' },
//     };

//     setChartData({ data: lineChartData, layout });
//   }, [year, month, filteredData]);

//   useEffect(() => {
//     if (chartData && chartData.data.length > 0) {
//       Plotly.newPlot('line-chart', chartData.data, chartData.layout);
//     } else {
//       Plotly.purge('line-chart'); // Clear the chart if there's no data
//     }
//   }, [chartData]);

//   return (
//     <div className="line-chart-container">
//       <h4>Expenses Line Chart</h4>

//       <div className="select-container">
//         <label htmlFor="year-select">Select Year:</label>
//         <select
//           id="year-select"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="2022">2022</option>
//           <option value="2023">2023</option>
//           <option value="2024">2024</option>
//           {/* Add more years as needed */}
//         </select>

//         <label htmlFor="month-select">Select Month:</label>
//         <select
//           id="month-select"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="01">January</option>
//           <option value="02">February</option>
//           <option value="03">March</option>
//           <option value="04">April</option>
//           <option value="05">May</option>
//           <option value="06">June</option>
//           <option value="07">July</option>
//           <option value="08">August</option>
//           <option value="09">September</option>
//           <option value="10">October</option>
//           <option value="11">November</option>
//           <option value="12">December</option>
//         </select>
//       </div>

//       <div id="line-chart"></div>
//     </div>
//   );
// };

// export default LineChart;



import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';
import './LineChart.css';  // Import the CSS file

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [year, setYear] = useState(''); // State to store the selected year
  const [month, setMonth] = useState(''); // State to store the selected month
  const [filteredExpenseData, setFilteredExpenseData] = useState([]); // Initialize as an empty array for expenses
  const [filteredIncomeData, setFilteredIncomeData] = useState([]); // Initialize as an empty array for income

  useEffect(() => {
    const fetchExpensesAndIncome = async () => {
      try {
        // Fetch expenses data
        const expenseResponse = await fetch('http://localhost:5000/expenses_line');
        const expenseData = await expenseResponse.json();
        setFilteredExpenseData(expenseData); // Store all expenses data initially

        // Fetch income data
        const incomeResponse = await fetch('http://localhost:5000/incomes_line');
        const incomeData = await incomeResponse.json();
        setFilteredIncomeData(incomeData); // Store all income data initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExpensesAndIncome();
  }, []);

  useEffect(() => {
    // Filter data based on the selected year and month
    const filteredExpenses = filteredExpenseData.filter((expense) => {
      const [expenseYear, expenseMonth] = expense.date ? expense.date.split('-') : [];
      const matchesYear = year ? expenseYear === year : true;
      const matchesMonth = month ? expenseMonth === month : true;
      return matchesYear && matchesMonth;
    });

    const filteredIncome = filteredIncomeData.filter((income) => {
      const [incomeYear, incomeMonth] = income.date ? income.date.split('-') : [];
      const matchesYear = year ? incomeYear === year : true;
      const matchesMonth = month ? incomeMonth === month : true;
      return matchesYear && matchesMonth;
    });

    // Prepare data for Plotly
    const expenseDates = filteredExpenses.map((expense) => expense.date);
    const expenseAmounts = filteredExpenses.map((expense) => expense.amount);

    const incomeDates = filteredIncome.map((income) => income.date);
    const incomeAmounts = filteredIncome.map((income) => income.amount);

    const lineChartData = [
      {
        x: expenseDates,
        y: expenseAmounts,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Expense',
        marker: { color: 'red' },
      },
      {
        x: incomeDates,
        y: incomeAmounts,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Income',
        marker: { color: 'green' },
      },
    ];

    const layout = {
      title: 'Income vs Expense Over Time',
      xaxis: { title: 'Date' },
      yaxis: { title: 'Amount' },
    };

    setChartData({ data: lineChartData, layout });
  }, [year, month, filteredExpenseData, filteredIncomeData]);

  useEffect(() => {
    if (chartData && chartData.data.length > 0) {
      Plotly.newPlot('line-chart', chartData.data, chartData.layout);
    } else {
      Plotly.purge('line-chart'); // Clear the chart if there's no data
    }
  }, [chartData]);

  return (
    <div className="line-chart-container">
      <h4>Income vs Expense Line Chart</h4>

      <div className="select-container">
        <label htmlFor="year-select">Select Year:</label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add more years as needed */}
        </select>

        <label htmlFor="month-select">Select Month:</label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div id="line-chart"></div>
    </div>
  );
};

export default LineChart;
