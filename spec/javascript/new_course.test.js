import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer from '../../app/javascript/store/user';
import coursesReducer from '../../app/javascript/store/coursesSlice';
import NewCourse from '../../app/javascript/pages/NewCourse';

const currentUser = {
  id: 1,
  name: 'John Doe',
};

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
  },
  preloadedState: {
    user: currentUser,
    courses: {
      error: '',
    },
  },
});

describe('NewCourse', () => {
  it('displays the form and all fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewCourse />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Make New Course')).toBeInTheDocument();
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Course Image URL:')).toBeInTheDocument();
    expect(screen.getByLabelText('Instructor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration:')).toBeInTheDocument();
  });

  it('displays a message to log in if user is not logged in', () => {
    const storeWithoutUser = configureStore({
      reducer: {
        user: userReducer,
        courses: coursesReducer,
      },
      preloadedState: {
        user: {
          id: null,
          name: '',
        },
        courses: {
          error: '',
        },
      },
    });

    render(
      <Provider store={storeWithoutUser}>
        <BrowserRouter>
          <NewCourse />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText('Please log in to create a new course.'),
    ).toBeInTheDocument();
  });
});
