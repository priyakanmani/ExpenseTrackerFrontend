import React from 'react';
import Sidebar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.mainContent}>{children}</main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  mainContent: {
    marginLeft: '250px', // Matches the sidebar width
    padding: '20px',
    flex: 1,
    overflowY: 'auto', // Handles scrolling for long content
  },
};

export default AppLayout;
