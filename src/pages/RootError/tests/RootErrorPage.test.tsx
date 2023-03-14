import { render, screen } from '@testing-library/react';
import { ErrorResponse } from '@remix-run/router';
import { RootErrorPage } from '../RootErrorPage';

jest.mock('@Components/NotFound/NotFound', () => ({
  NotFound: () => <p>Not Found Page</p>,
}));
jest.mock('@Pages/DefaultErrorPage/DefaultErrorPage', () => ({
  NotFound: () => <p>Default Error Page</p>,
}));
jest.mock('react-router', () => ({
  useRouteError: () => new ErrorResponse(404, 'some error', 'payload'),
  isRouteErrorResponse: () => true,
}));

describe('RootErrorPage component', () => {
  const renderComponent = () => render(<RootErrorPage />);

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/not found page/i)).toBeInTheDocument();
  });
});
