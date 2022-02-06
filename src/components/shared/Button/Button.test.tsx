import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonType } from './index';

describe('Button component tests', () => {
  it('should render button with text', () => {
    render(<Button variant={ButtonType.primary} test='unit'>Button</Button>);
    const button = screen.getByTestId('unit');
    expect(button).toHaveTextContent('Button');
  });

  it('should render button with right class "primary"', () => {
    const { container } = render(<Button variant={ButtonType.primary}>Button</Button>);
    expect(container.firstChild).toHaveClass('primary');
  });

  it('should render button with right class "secondary"', () => {
    const { container } = render(<Button variant={ButtonType.secondary}>Button</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });

  it('should render button with right class "dark"', () => {
    const { container } = render(<Button variant={ButtonType.dark}>Button</Button>);
    expect(container.firstChild).toHaveClass('dark');
  });

  it('should render button with given type', () => {
    render(<Button variant={ButtonType.primary} type="submit">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render button with default type="button"', () => {
    render(<Button variant={ButtonType.primary}>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should calls "onClick" prop on button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button
        variant={ButtonType.primary}
        onClick={onClick}
      >
        Button
      </Button>);
    fireEvent.click(getByText(/Button/i));
    expect(onClick).toHaveBeenCalled();
  });
});
