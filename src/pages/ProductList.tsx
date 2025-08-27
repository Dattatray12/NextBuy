import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import ProductTable from '../components/ProductTable';
import { api } from '../utils/api';

type ViewMode = 'grid' | 'table';
type SortOrder = 'asc' | 'desc';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('grid');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    setLoading(true);
    api.getProducts()
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];
    sorted.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    return sorted;
  }, [products, sortOrder]);

  return (
    <main className="product-list-main">
      <div className="product-list-header">
        <h2 className="product-list-title">
          <span className="title-icon">🛍️</span>
          Product List
        </h2>
        <div className="product-list-controls">
          <div className="control-group" role="group" aria-label="Sort by price">
            <span className="control-label">Sort by:</span>
            <button
              className={`control-btn ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => setSortOrder('asc')}
              aria-pressed={sortOrder === 'asc'}
            >
              <span className="btn-icon">📈</span>
              Price: Low to High
            </button>
            <button
              className={`control-btn ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => setSortOrder('desc')}
              aria-pressed={sortOrder === 'desc'}
            >
              <span className="btn-icon">📉</span>
              Price: High to Low
            </button>
          </div>
          <div className="control-group" role="group" aria-label="Toggle view">
            <span className="control-label">View:</span>
            <button
              className={`control-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              aria-label="Grid view"
            >
              <span className="btn-icon">🔲</span>
              Grid
            </button>
            <button
              className={`control-btn ${view === 'table' ? 'active' : ''}`}
              onClick={() => setView('table')}
              aria-pressed={view === 'table'}
              aria-label="Table view"
            >
              <span className="btn-icon">📊</span>
              Table
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}
      {error && (
        <div className="error-container">
          <span className="error-icon">❌</span>
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
        view === 'grid' ? (
          <section className="product-grid" aria-label="Product Grid">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <ProductTable products={sortedProducts} />
        )
      )}
    </main>
  );
};

export default ProductList;