import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  // Hide navbar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // Check for token
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  return (
    <nav style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '2rem 0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
        <h2 style={{ margin: 0, color: '#fff' }}>Smart Events</h2>
      </div>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}>
        <NavItem to="/">Dashboard</NavItem>
        <NavItem to="/profile">Profile</NavItem>
      </ul>
    </nav>
  );
}

// Helper component for nav items
function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        style={{
          display: 'block',
          padding: '1rem 2rem',
          color: isActive ? '#fff' : '#b3b3b3',
          textDecoration: 'none',
          backgroundColor: isActive ? '#2d2d2d' : 'transparent',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2d2d2d'}
        onMouseOut={(e) => e.target.style.backgroundColor = isActive ? '#2d2d2d' : 'transparent'}
      >
        {children}
      </Link>
    </li>
  );
}

export default Navbar;