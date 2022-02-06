import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../../store/store";
import MeetupsCard from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

describe('MeetupsCard tests', () => {
  const data = {
    id: "1",
    author: {
      id: "2",
      name: "John",
      surname: "Doe"
    },
    speakers: [
      {
        id: "3",
        name: "John",
        surname: "Doe"
      }
    ],
    subject: "React",
    excerpt: "The Best",
    start: "2022-08-08T18:51:23.289Z",
    finish: "2023-08-08T18:51:23.289Z",
    modified: "2021-10-08T18:51:23.289Z",
    place: "Minsk",
    status: "CONFIRM",
    isOver: false,
    goCount: 0,
    image: ""
  };

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MeetupsCard {...data} />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render MeetupsCard', () => {
    const container = screen.getByTestId('card-container');
    expect(container).toBeInTheDocument();
  });

  it('should render subject correctly', () => {
    const subject = screen.getByTestId('card-subject');
    expect(subject).toHaveTextContent(/^React$/);
  });

  it('should render excerpt correctly', () => {
    const excerpt = screen.getByTestId('card-excerpt');
    expect(excerpt).toHaveTextContent(/^The Best$/);
  });

  it('should render place correctly', () => {
    const container = screen.getByTestId('date-place-container');
    expect(container).toHaveTextContent("Minsk");
  });

  it('should render date correctly', () => {
    const container = screen.getByTestId('date-place-container');
    expect(container).toHaveTextContent("Monday, August 8");
  });

  it('should render time correctly', () => {
    const container = screen.getByTestId('date-place-container');
    expect(container).toHaveTextContent("09:51 PM");
  });
});
