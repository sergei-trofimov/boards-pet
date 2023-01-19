import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('App component', () => {
  test('should render div element with "Hello World" text', () => {
    // Arrange
    render(<App />);

    // Act
    const el = screen.getByText(/Hello world/i);

    // Assert
    expect(el).toBeInTheDocument();
  });
});
