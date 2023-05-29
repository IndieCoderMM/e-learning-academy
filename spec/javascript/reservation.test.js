import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reservation from '../../app/javascript/pages/Reservation';
import userReducer from '../../app/javascript/store/user';
import reservationReducer from '../../app/javascript/store/reservation';

const currentUser = {
  id: 1,
  name: 'John Doe',
};

const courseData = {
  id: 1,
  title: 'Course 1',
  description: 'Description for course 1',
  instructor: 'Instructor 1',
  price: 5.99,
  duration: 300,
  img_url: 'image1.jpg',
};

const initialReservation = [
  {
    id: 1,
    course: courseData,
    date: '2023-05-28',
    city: 'New York',
  },
];

const store = configureStore({
  reducer: {
    user: userReducer,
    reservations: reservationReducer,
  },
  preloadedState: {
    user: currentUser,
    reservations: { data: initialReservation },
  },
});

jest.mock('../../app/javascript/components/CustomCarousel', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ items }) => (
    <div data-testid="custom-carousel">
      {items.map((item) => (
        <div key={item.key}>{item.element.props.course.title}</div>
      ))}
    </div>
  )),
}));

jest.mock('../../app/javascript/components/ReservationAlert', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(() => (
      <div data-testid="reservation-alert">Mock ReservationAlert component</div>
    )),
}));

describe('Reservation component', () => {
  it('renders the page title', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <Reservation />
        </Provider>,
      );
    });
    expect(screen.getByText('Scheduled Classes')).toBeInTheDocument();
  });

  it('renders ReservationAlert component', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <Reservation />
        </Provider>,
      );
    });

    expect(screen.getByTestId('reservation-alert')).toBeInTheDocument();
  });

  it('renders CustomCarousel component when there are reserved items and a current user', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <Reservation />
        </Provider>,
      );
    });

    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
  });

  it('does not render CustomCarousel component when there are no reserved items', async () => {
    const storeWithNoReservedItems = configureStore({
      reducer: {
        user: userReducer,
        reservations: reservationReducer,
      },
      preloadedState: {
        user: currentUser,
        reservations: { data: [] },
      },
    });

    await act(() => {
      render(
        <Provider store={storeWithNoReservedItems}>
          <Reservation />
        </Provider>,
      );
    });

    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });
});
