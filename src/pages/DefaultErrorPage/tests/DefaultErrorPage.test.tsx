import { render, screen } from '@testing-library/react';
import { DefaultErrorPage } from '../DefaultErrorPage';

jest.mock('@Common/Animation/Animation', () => ({
  Animation: () => {
    return <p>Animation</p>;
  },
}));

describe('DefaultErrorPage component', () => {
  const renderComponent = () => render(<DefaultErrorPage />);

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/animation/i)).toBeInTheDocument();
    expect(screen.getByText(/ooops/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
