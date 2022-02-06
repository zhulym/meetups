import React from 'react';
import { render, screen } from '@testing-library/react';
import LocaleButtons from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

describe('Locale buttons tests', () => {
  it('should render buttons container', () => {
    render(<LocaleButtons />);
    const container = screen.getByTestId('locale-btn-container');
    expect(container).toBeInTheDocument();
  });

  it('should have correct class', () => {
    render(<LocaleButtons />);
    const enButton = screen.getByTestId('locale-btn-en');
    expect(enButton).toHaveClass('langBtn');
  });
});
