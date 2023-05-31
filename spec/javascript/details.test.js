import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../../app/javascript/store/coursesSlice';
import Details from '../../app/javascript/pages/Details';

const course = {
  id: 1,
  title: 'Course 1',
  description: 'Description for course 1',
  instructor: 'Instructor 1',
  price: 5.99,
  duration: 300,
  img_url: 'image1.jpg',
};

const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
  preloadedState: {
    courses: {
      courses: [course],
      loading: false,
      error: null,
    },
  },
});

describe('Details Page', () => {
  it('displays course details when course exists', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/details/${course.id}`]}>
        <Provider store={store}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(course.title)).toBeInTheDocument();
    expect(screen.getByText(course.description)).toBeInTheDocument();
    expect(screen.getByText(`$${course.price}`)).toBeInTheDocument();
  });

  it('displays "Course not found." when course does not exist', () => {
    const courseId = '3';
    render(
      <MemoryRouter initialEntries={[`/details/${courseId}`]}>
        <Provider store={store}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Course not found.')).toBeInTheDocument();
  });
});
