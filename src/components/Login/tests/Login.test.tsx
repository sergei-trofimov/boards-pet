import { AuthErrorKeys, AuthErrorMapper } from '@Constants/auth-error-mapper.constant';
import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Login } from '../Login';

const navigationState = { state: 'loading' };
let actionData = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => navigationState,
  useActionData: () => actionData,
  Form: ({ children }: PropsWithChildren): JSX.Element => <form>{children}</form>
}));
jest.mock('@Common/Button/Button', () => ({
  Button: ({ children }: PropsWithChildren): JSX.Element => <button>{children}</button>,
}));

describe('Login component', () => {
  const renderComponent = () => render(<Login />);

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByRole('button').textContent).toBe('Log In');
  });

  Object.keys(AuthErrorKeys).forEach((key: string) => {
    it('should display error message appropriate to error code', () => {
      // Arrange
      // Act
      actionData = { message: key };
  
      renderComponent();

      const message = AuthErrorMapper[key as AuthErrorKeys];
  
      // Assert
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
