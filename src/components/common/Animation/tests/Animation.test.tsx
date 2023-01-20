import { render, screen } from '@testing-library/react';
import Animation from '../Animation';
import { AnimationProps } from '../types';
import { AnimationsName } from '@Models/animations/animations.model';

jest.mock('lottie-react', () => ({
  useLottie: () => ({
    View: <p>My Animation</p>,
  }),
}));
describe('Animation component', () => {
  const renderComponent = (props: AnimationProps) => render(<Animation {...props} />);

  it('should display content created by the useLottie hook', () => {
    // Arrange
    // Act
    renderComponent({ animationName: AnimationsName.NOT_FOUND });

    // Assert
    expect(screen.getByText(/My Animation/i)).toBeInTheDocument();
  });
});
