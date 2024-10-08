import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../contextProvider/context';
import {getCartInStore } from '../../store/localStorage';
import Home from './home';
import '@testing-library/jest-dom/extend-expect';

// Mocking dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../../contextProvider/context', () => ({
  useMyContext: jest.fn(),
}));
jest.mock('../../store/localStorage', () => ({
  getCartInStore: jest.fn(),
  addToCart: jest.fn(),
}));

describe('Home Component', () => {
  const mockNavigate = jest.fn();
  const mockSetCartLen = jest.fn();

  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      image: 'image1.jpg',
      category: 'Category 1',
      rating: { rate: 4.5, count: 10 },
      price: 29.99,
    },
    {
      id: 2,
      title: 'Product 2',
      image: 'image2.jpg',
      category: 'Category 2',
      rating: { rate: 3.8, count: 20 },
      price: 59.99,
    },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useMyContext as jest.Mock).mockReturnValue({
      products: mockProducts,
      searchQuery: '',
      selectedCategory: 'all',
      searchResults: [],
      setCartLen: mockSetCartLen,
    });
    (getCartInStore as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render products correctly', () => {
    render(<Home />);

    // Check if the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('should navigate to product details page on clicking a product', () => {
    render(<Home />);

    // Click on the product name to trigger navigation
    fireEvent.click(screen.getByText('Product 1'));
    
    // Ensure navigation is triggered with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  test('should display "Add to Cart" button and add product to cart when clicked', () => {
    render(<Home />);

    // Check that the "Add to Cart" button is rendered
    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    expect(addToCartButton).toBeInTheDocument();
    
    // Simulate clicking "Add to Cart"
    fireEvent.click(addToCartButton);
    
    // Ensure the cart length is updated by the addToCart function
    expect(mockSetCartLen).toHaveBeenCalled();
  });

  test('should display "Added to Cart" when product is already in cart', () => {
    // Mock the cart to return a product in the cart
    (getCartInStore as jest.Mock).mockReturnValue([{ id: 1 }]);

    render(<Home />);

    // Check if the button displays "Added to Cart" for a product already in the cart
    expect(screen.getAllByText('Added to Cart')[0]).toBeInTheDocument();
  });

  test('should render "No Results found" if search query returns no results', () => {
    // Mock search results to be empty
    (useMyContext as jest.Mock).mockReturnValue({
      products: [],
      searchQuery: 'NonExistentProduct',
      selectedCategory: 'all',
      searchResults: [],
      setCartLen: mockSetCartLen,
    });

    render(<Home />);

    // Check for "No Results found" message
    expect(screen.getByText('No Results found for searched query!')).toBeInTheDocument();
  });
});
