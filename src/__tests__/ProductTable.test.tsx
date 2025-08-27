import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductTable from '../components/ProductTable';
import type { Product } from '../types/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 99.99,
    description: 'A great product',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/test1.jpg',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 149.99,
    description: 'Another great product',
    category: 'clothing',
    image: 'https://fakestoreapi.com/img/test2.jpg',
    rating: { rate: 4.2, count: 15 },
  },
];

describe('ProductTable', () => {
  it('renders table headers correctly', () => {
    render(<ProductTable products={mockProducts} />);
    
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders all products in table rows', () => {
    render(<ProductTable products={mockProducts} />);
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5 (10)')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.2 (15)')).toBeInTheDocument();
  });

  it('renders product images with correct alt text', () => {
    render(<ProductTable products={mockProducts} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Test Product 1');
    expect(images[1]).toHaveAttribute('alt', 'Test Product 2');
  });

  it('renders empty table when no products provided', () => {
    render(<ProductTable products={[]} />);
    
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    
    // Should not have any product data
    expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ProductTable products={mockProducts} />);
    
    expect(screen.getByLabelText('Product Table')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Product 2')).toBeInTheDocument();
  });
});
