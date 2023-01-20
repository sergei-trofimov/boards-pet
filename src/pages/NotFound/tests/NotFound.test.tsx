import { render, screen } from '@testing-library/react';
import NotFoundPage from '../NotFound';

jest.mock('@Common', () => ({
  Animation: () => {
    return <p>My Animation</p>;
  },
}));
describe('NotFound component', () => {
  const renderComponent = () => render(<NotFoundPage />);

  it('should display coorect content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/nothing here/i)).toBeInTheDocument();
    expect(screen.getByText(/My Animation/i)).toBeInTheDocument();
    expect(screen.getByText(/looking for is not found or never existed/i)).toBeInTheDocument();
  });
});
