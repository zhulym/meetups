import { getDate, getTime, getTimeDate, getFullDate } from './dates';

describe('should return right date and time', () => {
  it('should return right date', () => {
    expect(getDate("2022-06-09T23:35:47.068Z")).toBe('Friday, June 10');
  });

  it('should return right time', () => {
    expect(getTime("2022-06-09T23:35:47.068Z")).toBe('02:35 AM');
  });
  it('should return right date with time', () => {
    expect(getTimeDate("2022-06-09T23:35:47.068Z")).toBe('June 10, 02:35 AM');
  });
  it('should return right full date', () => {
    expect(getFullDate("2022-06-09T23:35:47.068Z")).toBe('Friday, June 10, 2022');
  });
});
