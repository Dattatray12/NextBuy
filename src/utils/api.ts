// API base URL configuration
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '';

export const api = {
  getProducts: async () => {
    const url = API_BASE_URL ? `${API_BASE_URL}/products` : '/products';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },
};
