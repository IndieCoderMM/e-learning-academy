import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../../app/javascript/store/reservation';
import Reservation from '../../app/javascript/pages/Reservation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../app/javascript/store/reservation', () => ({
  getUserReservations: jest.fn(),
}));

describe('Reservation component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      data: [
        {
          id: 1,
          course: 'Math',
          date: '2023-05-28',
          city: 'New York',
        },
        {
          id: 2,
          course: 'Science',
          date: '2023-05-29',
          city: 'Los Angeles',
        },
      ],
    });

    useSelector.mockReturnValueOnce({ id: 123 });

    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    getUserReservations.mockClear();
  });

  it('renders the page title', () => {
    render(<Reservation />);

    expect(screen.getByText('Scheduled Classes')).toBeInTheDocument();
  });

  it('renders ReservationAlert component', () => {
    render(<Reservation />);

    expect(screen.getByTestId('reservation-alert')).toBeInTheDocument();
  });

  it('renders CustomCarousel component when there are reserved items and a current user', () => {
    render(<Reservation />);

    expect(
      screen.getByText('You currently have 2 study sessions scheduled.'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
  });

  it('does not render CustomCarousel component when there are no reserved items', () => {
    useSelector.mockReturnValueOnce({ data: [] });

    render(<Reservation />);

    expect(
      screen.queryByText('You currently have 0 study sessions scheduled.'),
    ).toBeNull();
    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });

  it('does not render CustomCarousel component when there is no current user', () => {
    useSelector.mockReturnValueOnce(null);

    render(<Reservation />);

    expect(
      screen.queryByText('You currently have 2 study sessions scheduled.'),
    ).toBeNull();
    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });

  it('dispatches getUserReservations action when currentUser is set', () => {
    render(<Reservation />);

    expect(getUserReservations).toHaveBeenCalledWith(123);
  });
});
