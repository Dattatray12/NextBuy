
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/Product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A great product',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductCard', () => {
  it('renders product details', () => {
    const { getByText, getByAltText } = render(<ProductCard product={mockProduct} />);
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('$99.99')).toBeInTheDocument();
    expect(getByText(/4.5/)).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });
});
