import React from 'react';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <article className="product-card" tabIndex={0} aria-label={product.title}>
    <img src={product.image} alt={product.title} className="product-image" />
    <div className="product-info">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <div className="product-rating" aria-label={`Rating: ${product.rating.rate} out of 5`}>
        <span>⭐ {product.rating.rate} ({product.rating.count})</span>
      </div>
    </div>
  </article>
);

export default ProductCard;