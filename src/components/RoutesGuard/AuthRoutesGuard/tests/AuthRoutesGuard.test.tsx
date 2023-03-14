import { render, screen } from '@testing-library/react';
import { AuthRoutesGuard } from '../AuthRoutesGuard';

let mockLoggedIn: boolean;
jest.mock('@App-store/store', () => ({
  useAppSelector: () => mockLoggedIn,
}));
jest.mock('react-router-dom', () => ({
  Outlet: () => <p>Outlet</p>,
}));
jest.mock('@Components/Auth/Auth', () => ({
  Auth: () => <p>Auth</p>
}))

describe('AuthRoutesGuard component', () => {
  const renderComponent = () => render(<AuthRoutesGuard />);

  it('should display auth in case user is not authenticated', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/auth/i)).toBeInTheDocument();
  });

  it('should display outlet in case user is authenticated', () => {
    // Arrange
    mockLoggedIn = true;

    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/outlet/i)).toBeInTheDocument();
  });
});
