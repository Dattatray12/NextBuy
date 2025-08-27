import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
