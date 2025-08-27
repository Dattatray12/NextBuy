import React from 'react';
import type { Product } from '../types/Product';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => (
  <div className="product-table-wrapper">
    <table className="product-table" aria-label="Product Table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} tabIndex={0} aria-label={product.title}>
            <td><img src={product.image} alt={product.title} className="table-product-image" /></td>
            <td>{product.title}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>⭐ {product.rating.rate} ({product.rating.count})</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;