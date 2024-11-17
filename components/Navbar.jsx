import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { FaHome, FaChartBar, FaBox, FaUsers, FaChevronDown, FaChevronRight, FaLineChart } from 'react-icons/fa';
import { FaDollarSign, FaRegCreditCard } from 'react-icons/fa'; // Importing new icons for Income and Expense
import { FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <span style={styles.logoTitle}>&nbsp;&nbsp;&nbsp;&nbsp;CashFlowTracker</span>
      </div>

      <nav style={styles.navContainer}>
        <Link to="/" style={styles.navLink}>
          <FaHome style={styles.icon} /> Home
        </Link>
        <Link to="/piechart" style={styles.navLink}>
          <FaChartBar style={styles.icon} /> Dashboard
        </Link>
        
        {/* Updated Income link with a new icon */}
        <Link to="/income" style={styles.navLink}>
          <FaDollarSign style={styles.icon} /> Income
        </Link>

        {/* Updated Expense link with a new icon */}
        <Link to="/expense" style={styles.navLink}>
          <FaRegCreditCard style={styles.icon} /> Expense
        </Link>
        
        <Link to="/linechart" style={styles.navLink}>
          <FaChartLine style={styles.icon} /> Line Chart
        </Link>

        <Link to="/savings" style={styles.navLink}>
          <FaUsers style={styles.icon} /> Savings
        </Link>

        
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: 'black',
    color: '#fff',
    padding: '20px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '10px',
  },
  logoTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    fontfamily: '"Cinzel", serif'
  },
  navContainer: {
    width: '100%',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  icon: {
    marginRight: '10px',
  },
  collapseIcon: {
    marginLeft: 'auto',
  },
  collapseContent: {
    backgroundColor: '#495057',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  collapsedLink: {
    padding: '5px 0',
    color: '#ddd',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
};

export default Sidebar;
