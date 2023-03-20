import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from '../Auth';

const navigate = jest.fn();

jest.mock('@Common/Button/Button', () => ({
  Button: (props: PropsWithChildren) => {
    return <button onClick={() => navigate('mock')}>{props.children}</button>;
  },
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
}));

describe('Auth component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

  it('should display two buttons', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('should display two', () => {
    // Arrange
    // Act
    renderComponent();

    const button: HTMLButtonElement = screen.getByText(/Log In/i);
    button.click();

    // Assert
    expect(navigate).toHaveBeenCalledWith('mock');
  });
});
