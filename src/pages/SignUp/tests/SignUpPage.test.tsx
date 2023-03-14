import { render, screen } from '@testing-library/react';
import { SignUpPage } from '../SignUpPage';
import { AppRoutes } from '@Constants/app-routes';

const navigate = jest.fn();
const dispatch = jest.fn();
let actionData = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
  useActionData: () => actionData,
}));
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => dispatch,
  };
});
jest.mock('@Components/SignUp/SignUp', () => ({
  SignUp: () => <p>Sign Up</p>,
}));

describe('SignUpPage component', () => {
  const renderComponent = () => render(<SignUpPage />);

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should not call dispatch and navigate methods in case actionData has not AuthResponse type', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(navigate).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should call dispatch and navigate methods in case actionData has AuthResponse type', () => {
    // Arrange
    // Act
    actionData = { idToken: '1' };

    renderComponent();

    // Assert
    expect(navigate).toHaveBeenCalledWith(`/${AppRoutes.boards}`);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
