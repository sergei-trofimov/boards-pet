import { render, screen } from '@testing-library/react';
import { CardsPage } from '../CardsPage';

const dispatch = jest.fn();

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => dispatch,
  };
});
jest.mock('react-router-dom', () => ({
  useParams: () => ({ boardId: '1' }),
  Outlet: () => <p>Outlet</p>,
}));

describe('CardsPage component', () => {
  const renderComponent = () => render(<CardsPage />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display correct content', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/outlet/i)).toBeInTheDocument();
  });

  it('should call dispatch method', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
