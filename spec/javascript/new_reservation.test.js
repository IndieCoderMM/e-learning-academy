import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer from '../../app/javascript/store/user';
import coursesReducer from '../../app/javascript/store/coursesSlice';
import reservationReducer from '../../app/javascript/store/reservation';
import NewReservation from '../../app/javascript/pages/NewReservation';

const currentUser = {
  id: 1,
  name: 'John Doe',
};

const courses = [
  {
    id: 1,
    title: 'Course 1',
  },
  {
    id: 2,
    title: 'Course 2',
  },
];

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    reservations: reservationReducer,
  },
  preloadedState: {
    user: currentUser,
    courses: {
      courses,
    },
    reservations: {
      status: '',
      error: '',
    },
  },
});

describe('New Reservation Page', () => {
  it('displays the form and all fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewReservation />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Make New Reservation')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Class')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter Study Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
  });

  it('autofills the username', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewReservation />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('Username')).toHaveValue(currentUser.name);
  });

  it('displays a message when user is not logged in', () => {
    const storeWithoutUser = configureStore({
      reducer: {
        user: userReducer,
        courses: coursesReducer,
        reservations: reservationReducer,
      },
      preloadedState: {
        user: {
          id: null,
          name: '',
        },
        courses: {
          courses,
        },
        reservations: {
          status: '',
          error: '',
        },
      },
    });

    render(
      <Provider store={storeWithoutUser}>
        <BrowserRouter>
          <NewReservation />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText('Please log in to create a new reservation'),
    ).toBeInTheDocument();
  });
});
