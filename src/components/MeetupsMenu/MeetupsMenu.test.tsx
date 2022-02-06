import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MeetupsMenu from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

describe('MeetupsMenu component tests', () => {
  it('should be in document', () => {
    render(
      <Router>
        <MeetupsMenu />
      </Router>
    );
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
});
