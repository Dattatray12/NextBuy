import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
    <h1>Welcome to NextBuy</h1>
    <p>Your one-stop shop for the best products!</p>
    <Link to="/product-list" style={{
      marginTop: 24,
      padding: '12px 24px',
      background: '#007bff',
      color: '#fff',
      borderRadius: 6,
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: 18,
      transition: 'background 0.2s',
      display: 'inline-block',
    }}>Go to Product List</Link>
  </main>
);

export default Home;