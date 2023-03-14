import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { PropsWithChildren } from 'react';
import { AppRoutes } from '@Constants/app-routes';

let pathMatch: boolean;
const navigate = jest.fn();
const dispatch = jest.fn();

jest.mock('@Common/Button/Button', () => ({
  Button: ({ children, onClickHandler }: PropsWithChildren<{ onClickHandler: () => void }>): JSX.Element => (
    <button onClick={onClickHandler}>{children}</button>
  ),
}));
jest.mock('@Icons', () => ({
  Add: () => <p>Add Icon</p>,
}));
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/' }),
  useMatch: () => pathMatch,
  useNavigate: () => navigate,
}));
jest.mock('@App-store/store', () => ({
  useAppDispatch: () => dispatch,
}));

describe('Header component', () => {
  const renderComponent = () => render(<Header />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/Boards/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Field/i)).toBeNull();
  });

  it('should display correct content. Case when pathMatch data exists', () => {
    // Arrange
    pathMatch = true;

    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/Add Field/i)).toBeInTheDocument();
  });

  it('should call navigate method when user click "Add Field" button', () => {
    // Arrange
    pathMatch = true;

    // Act
    renderComponent();
    screen.getByText(/Add Field/i).click();

    // Assert
    expect(navigate).toHaveBeenCalledWith(`${location.pathname}/${AppRoutes.newField}`);
  });

  it('should call navigate method when user click "Boards" button', () => {
    // Arrange
    // Act
    renderComponent();
    screen.getByText(/boards/i).click();

    // Assert
    expect(navigate).toHaveBeenCalledWith(AppRoutes.boards);
  });

  it('should call navigate method when user click "Log out" button', () => {
    // Arrange
    // Act
    renderComponent();
    screen.getByText(/Log out/i).click();

    // Assert
    expect(navigate).toHaveBeenCalledWith('/');
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
