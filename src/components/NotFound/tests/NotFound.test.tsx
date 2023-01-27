import { render, screen } from '@testing-library/react';
import { NotFound } from '../NotFound';

jest.mock('@Common/Animation/Animation', () => ({
  Animation: () => {
    return <p>My Animation</p>;
  },
}));
describe('NotFound component', () => {
  const renderComponent = () => render(<NotFound />);

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
