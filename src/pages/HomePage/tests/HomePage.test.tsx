import { AppRoutes } from '@Constants/app-routes';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../HomePage';

const navigate = jest.fn();
let pathname = '';

jest.mock('@Components/Header/Header', () => ({
  Header: () => <p>Header</p>,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({ pathname }),
  Outlet: () => <p>Outlet</p>
}));

describe('HomePage component', () => {
  const renderComponent = () => render(<HomePage />);

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/outlet/i)).toBeInTheDocument();
  });

  it('should not call navigate method in case pathname do not equal to "/"', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should call navigate method in case pathname equals to "/"', () => {
    // Arrange
    pathname = '/';

    // Act
    renderComponent();

    // Assert
    expect(navigate).toHaveBeenCalledWith(AppRoutes.boards);
  });
});
