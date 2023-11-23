import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

const mockHandleBuy = jest.fn();

const mockProduct = {
  amountAvailable: 10,
  cost: 50,
  productName: 'Test Product',
  id: '123',
  userId: 'seller123',
  sellerId: 'seller123',
  userRole: 'seller',
  image: 'https://example.com/image.jpg',
  handleBuy: mockHandleBuy,
};

describe('ProductCard component', () => {
  beforeEach(() => {
    render(<ProductCard {...mockProduct} />);
  });

  test('renders product details correctly', () => {
    expect(screen.getByAltText(mockProduct.productName)).toBeInTheDocument();
    expect(screen.getByText(`sellerId: ${mockProduct.sellerId}`)).toBeInTheDocument();
    expect(screen.getByText(`Available: ${mockProduct.amountAvailable}`)).toBeInTheDocument();
    expect(screen.getByText(`Price: N$${mockProduct.cost}`)).toBeInTheDocument();
  });

  test('calls handleBuy function when Buy link is clicked', () => {
    const buyLink = screen.getByText('Buy');
    fireEvent.click(buyLink);
    expect(mockHandleBuy).toHaveBeenCalledWith(mockProduct.cost, mockProduct.id);
  });

  test('renders VMModal for seller user with correct props', () => {
    // render(<ProductCard {...mockProduct} userRole="seller" />);
    
    // const updateButton = screen.getByText('Update');
    // fireEvent.click(updateButton);

    // Add assertions for VMModal rendering and props verification
    // Example: expect(screen.getByText('Update Product')).toBeInTheDocument();
  });
});
