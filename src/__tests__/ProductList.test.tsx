import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../pages/ProductList';
import type { Product } from '../types/Product';

// Mock the API module
jest.mock('../utils/api', () => ({
  api: {
    getProducts: jest.fn(),
  },
}));

// Import the mocked API
import { api } from '../utils/api';

const mockProducts = [
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

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset timers to ensure consistent async behavior
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders loading state initially', async () => {
    // Mock the API to return a promise that resolves immediately
    (api.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    
    render(<ProductList />);
    
    // Initially should show loading state
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    expect(screen.getByText('Product List')).toBeInTheDocument();
    
    // Wait for loading to complete and products to render
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    // Loading state should be gone
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
  });

  it('shows loading state while fetching products', async () => {
    // Create a promise that we can control
    let resolvePromise: (value: Product[]) => void;
    const promise = new Promise<Product[]>((resolve) => {
      resolvePromise = resolve;
    });
    
    (api.getProducts as jest.Mock).mockReturnValue(promise);
    
    render(<ProductList />);
    
    // Should show loading initially
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    
    // Resolve the promise
    resolvePromise!(mockProducts);
    
    // Wait for products to render
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    // Loading should be gone
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    (api.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    render(<ProductList />);
    
    // Wait for all state updates to complete (loading -> products loaded)
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    // Verify all products are rendered
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    
    // Verify loading state is gone
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
  });

  it('switches to table view when table button is clicked', async () => {
    (api.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    render(<ProductList />);
    
    // Wait for products to load first
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    // Now click the table button
    const tableButton = screen.getByRole('button', { name: /table/i });
    fireEvent.click(tableButton);
    
    // Wait for view change to complete
    await waitFor(() => {
      expect(screen.getByText('Image')).toBeInTheDocument();
    });
    
    // Verify table headers are shown
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch products';
    (api.getProducts as jest.Mock).mockRejectedValue(new Error(errorMessage));
    render(<ProductList />);
    
    // Wait for error state to be set
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    // Verify loading state is gone
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
  });

  it('sorts products by price correctly', async () => {
    (api.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    render(<ProductList />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    // Click the high to low button
    const highToLowButton = screen.getByRole('button', { name: /price: high to low/i });
    fireEvent.click(highToLowButton);
    
    // Wait for sorting to complete
    await waitFor(() => {
      // The more expensive product should appear first
      const productElements = screen.getAllByText(/Test Product/);
      expect(productElements[0]).toHaveTextContent('Test Product 2');
    });
  });
});
