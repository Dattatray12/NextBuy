import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('Home', () => {
  it('renders welcome message and description', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Welcome to NextBuy')).toBeInTheDocument();
    expect(screen.getByText('Your one-stop shop for the best products!')).toBeInTheDocument();
  });

  it('renders navigation link to product list', () => {
    renderWithRouter(<Home />);
    
    const link = screen.getByRole('link', { name: /go to product list/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/product-list');
  });

  it('renders main heading as h1', () => {
    renderWithRouter(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome to NextBuy');
  });

  it('has proper styling attributes', () => {
    renderWithRouter(<Home />);
    
    const link = screen.getByRole('link', { name: /go to product list/i });
    expect(link).toHaveStyle({
      background: '#007bff',
      color: '#fff',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '18px',
    });
  });
});
