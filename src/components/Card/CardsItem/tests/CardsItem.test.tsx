import { render, screen } from '@testing-library/react';
import { CardsItem } from '../CardsItem';
import { PropsWithChildren } from 'react';
import { Card } from '@Types/entities/card.model';

const navigate = jest.fn();
const dispatch = jest.fn();

jest.mock('@Common/Button/Button', () => ({
  Button: ({ children, onClickHandler }: PropsWithChildren<{ onClickHandler: () => void }>): JSX.Element => (
    <button onClick={onClickHandler}>{children}</button>
  ),
}));
jest.mock('@Icons', () => ({
  pencil: 'pencil_url',
  bin: 'bin_url',
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));
jest.mock('@App-store/store', () => ({
  useAppDispatch: () => dispatch,
}));
jest.mock('@Components/Field/FieldsContainer/FieldsContainer', () => ({
  FieldsContainer: () => <p>fields container component</p>
}))

describe('CardsItem component', () => {
  const renderComponent = () => render(<CardsItem card={{ title: 'mock_title', id: '1' } as Card} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display correct h3 element', () => {
    // Arrange
    // Act
    renderComponent();

    // Assert
    expect(screen.getByText(/mock_title/i)).toBeInTheDocument();
  });

  it('should set correct src paths to images', () => {
    // Arrange
    // Act
    renderComponent();

    const images: HTMLImageElement[] = screen.getAllByRole('img');

    // Assert
    expect(images[0].src.endsWith('pencil_url')).toBeTruthy();
    expect(images[1].src.endsWith('bin_url')).toBeTruthy();
  });

  it('should call navigate method on first btn click', () => {
    // Arrange
    // Act
    renderComponent();

    const btn: HTMLButtonElement[] = screen.getAllByRole('button');
    btn[0].click();

    // Assert
    expect(navigate).toHaveBeenCalledWith('1/edit', { state: { id: '1', title: 'mock_title' } });
  });

  it('should display fields container component in case fields exist', () => {
    // Arrange
    // Act
    render(<CardsItem card={{ title: 'mock_title', id: '1', fields: [{}] } as Card} />);

    // Assert
    expect(screen.getByText(/fields container component/i)).toBeInTheDocument();
  });
});
