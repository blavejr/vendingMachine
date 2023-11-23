import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mocking the userAPI and productsAPI
jest.mock('../../api/user');
jest.mock('../../api/product');

test('renders Home component', async () => {
  // Mock user data
  const mockUser = {
    id: '123',
    name: 'John Doe',
    deposit: 100,
    role: 'buyer',
  };

  // Mock product data
  const mockProducts = {
    items: [
      {
        id: '1',
        amountAvailable: 10,
        cost: 5,
        productName: 'Product 1',
        sellerId: '456',
        created_at: '2022-01-01',
        updated_at: '2022-01-02',
      },
      // Add more mock products if needed
    ],
  };

  // Mock read and write functions
  const mockRead = jest.fn(() => mockUser);
  const mockWrite = jest.fn();

  // Mock the localStorage functions
  jest.mock('../../utils/localStorage', () => ({
    read: mockRead,
    write: mockWrite,
  }));

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Check if the Navbar is rendered with the correct user data
  expect(screen.getByText(`Hello, ${mockUser.name}!`)).toBeInTheDocument();
  expect(screen.getByText(`Deposit: ${mockUser.deposit}`)).toBeInTheDocument();

  // Check if the ProductCard component is rendered for each product
  mockProducts.items.forEach((product) => {
    expect(screen.getByText(product.productName)).toBeInTheDocument();
    // Add more assertions based on your ProductCard component
  });

  // Ensure that the getAll function is called once
  expect(require('../../api/product').getAll).toHaveBeenCalledTimes(1);

  // Ensure that the getUser function is called once
  expect(require('../../api/user').getUser).toHaveBeenCalledTimes(1);
});
