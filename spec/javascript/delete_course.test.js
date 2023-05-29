import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DeleteCourse from '../../app/javascript/pages/DeleteCourse';
import userReducer from '../../app/javascript/store/user';
import coursesReducer from '../../app/javascript/store/coursesSlice';

const currentUser = {
  id: 1,
  name: 'John Doe',
};

const initialCourses = [
  {
    id: 1,
    title: 'Math',
    description: 'Maths is the language of the gods',
    instructor: 'Instructor 1',
    price: 5.99,
    duration: 200,
    img_url: 'image1.jpg',
  },
  {
    id: 2,
    title: 'Science',
    description: 'Science is a systematic and evidence-based approach.',
    instructor: 'Instructor 2',
    price: 5.99,
    duration: 100,
    img_url: 'image2.jpg',
  },
];

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
  },
  preloadedState: {
    user: currentUser,
    courses: {
      courses: initialCourses,
    },
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

jest.mock('../../app/javascript/components/DeleteCourseAlert', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => (
    <div data-testid="delete-course-alert">Mock DeleteCourseAlert component</div>
  )),
}));

describe('DeleteCourse component', () => {
  it('renders DeleteCourseAlert component', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <DeleteCourse />
        </Provider>,
      );
    });

    expect(screen.getByTestId('delete-course-alert')).toBeInTheDocument();
  });

  it('renders CustomCarousel component when there are courses and a current user', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <DeleteCourse />
        </Provider>,
      );
    });

    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
  });

  it('does not render CustomCarousel component when there are no courses', async () => {
    const storeWithNoCourses = configureStore({
      reducer: {
        user: userReducer,
        courses: coursesReducer,
      },
      preloadedState: {
        user: currentUser,
        courses: {
          courses: [],
        },
      },
    });

    await act(() => {
      render(
        <Provider store={storeWithNoCourses}>
          <DeleteCourse />
        </Provider>,
      );
    });

    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });

  it('does not render CustomCarousel component when currentUser is not set', async () => {
    const storeWithoutUser = configureStore({
      reducer: {
        user: userReducer,
        courses: coursesReducer,
      },
      preloadedState: {
        user: { id: null },
        courses: {
          courses: initialCourses,
        },
      },
    });

    await act(() => {
      render(
        <Provider store={storeWithoutUser}>
          <DeleteCourse />
        </Provider>,
      );
    });

    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });
});
