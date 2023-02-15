import { AppRoutes } from '@Constants/app-routes';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RootLayout } from '../RootLayout';

const loaderData = jest.fn();
const navigate = jest.fn();
const dispatch = jest.fn();
let mockLoggedIn: boolean;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => loaderData,
  useNavigate: () => navigate,
}));
jest.mock('@App-store/store', () => ({
  useAppSelector: () => mockLoggedIn,
}));
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => dispatch,
  };
});

describe('RootLayout component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );

  it('should not redirect in case user isn`t logged in', () => {
    // Arrange
    mockLoggedIn = false;

    // Act
    renderComponent();

    // Assert
    expect(navigate).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should redirect to the boards page in case user is logged in', () => {
    // Arrange
    mockLoggedIn = true;

    // Act
    renderComponent();

    // Assert
    expect(navigate).toHaveBeenCalledWith(AppRoutes.boards);
    expect(dispatch).toHaveBeenCalled();
  });
});
