import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./Router', () => [{ path: '/', element: <p>Home Page</p> }]);
describe('App component', () => {
  const renderComponent = () => render(<App />);

  it('should display an element corresponding to the current route', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
