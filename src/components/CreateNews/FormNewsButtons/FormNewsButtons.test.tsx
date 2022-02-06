import React from 'react';
import { render, screen } from '@testing-library/react';
import FormNewsButtons from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

describe('News form buttons', () => {
  it('should render news form buttons container', () => {
    const { container } = render(<FormNewsButtons />);
    expect(container).toBeInTheDocument();
  });

  it('should have submit button', () => {
    render(<FormNewsButtons />);
    const submitBtn = screen.getByTestId('news-form-btn');
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });

  it('should have text "create" when is creating form', () => {
    render(<FormNewsButtons />);
    const submitBtn = screen.getByTestId('news-form-btn');
    expect(submitBtn).toHaveTextContent('buttons.create');
  });

  it('should have text "save" when is editing form', () => {
    render(<FormNewsButtons isEditForm />);
    const submitBtn = screen.getByTestId('news-form-btn');
    expect(submitBtn).toHaveTextContent('buttons.save');
  });

  it('should have text "cancel" when is editing form', () => {
    render(<FormNewsButtons isEditForm />);
    const backBtn = screen.getByTestId('news-form-back-btn');
    expect(backBtn).toHaveTextContent('buttons.cancel');
  });

});
