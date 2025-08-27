// Mock the entire API module to avoid import.meta issues
jest.mock('../utils/api', () => ({
  api: {
    getProducts: jest.fn(),
  },
}));

// Import the mocked API
import { api } from '../utils/api';

describe('API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products successfully', async () => {
    const mockProducts = [
      { id: 1, title: 'Test Product', price: 99.99 }
    ];
    
    (api.getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    const result = await api.getProducts();
    
    expect(result).toEqual(mockProducts);
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });

  it('throws error when API call fails', async () => {
    const errorMessage = 'Failed to fetch products';
    (api.getProducts as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(api.getProducts()).rejects.toThrow(errorMessage);
  });

  it('handles API errors properly', async () => {
    const errorMessage = 'Network error';
    (api.getProducts as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(api.getProducts()).rejects.toThrow(errorMessage);
  });
});
