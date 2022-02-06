import React from 'react';
import { render } from '@testing-library/react';
import Avatar from './index';

describe('Avatar component tests', () => {
  it('should render component with extraClass', () => {
    const { container } = render(
      <Avatar
        name="John"
        surname="Doe"
        extraClass="super-avatar"
      />
    );
    expect(container.firstChild).toHaveClass('super-avatar');
  });

  it('should render avatar image without text', () => {
    const image = 'assets/images/meetup-image.jpg';
    const { container } = render(<Avatar name="John" surname="Doe" avatar={image} />);
    expect(container.firstChild).toContainHTML('img');
    expect(container.firstChild).not.toHaveTextContent('JD');
  });

  it('should render first letters without avatar', () => {
    const { container } = render(<Avatar name="John" surname="Doe" />);
    expect(container.firstChild).toHaveTextContent('JD');
  });
});
