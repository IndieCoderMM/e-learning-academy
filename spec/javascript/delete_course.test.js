import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../../app/javascript/store/coursesSlice';
import DeleteCourse from '../../app/javascript/pages/DeleteCourse';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../app/javascript/store/coursesSlice', () => ({
  coursesActions: {
    fetchCourses: jest.fn(),
  },
}));

describe('DeleteCourse component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      courses: [
        { id: 1, title: 'Math' },
        { id: 2, title: 'Science' },
      ],
    });

    useSelector.mockReturnValueOnce({ id: 123 });

    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    coursesActions.fetchCourses.mockClear();
  });

  it('dispatches fetchCourses action when currentUser is set', () => {
    render(<DeleteCourse />);

    expect(coursesActions.fetchCourses).toHaveBeenCalled();
  });

  it('renders DeleteCourseItem component for each course when courses exist and currentUser is set', () => {
    render(<DeleteCourse />);

    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('does not render DeleteCourseItem component when courses do not exist', () => {
    useSelector.mockReturnValueOnce({ courses: [] });

    render(<DeleteCourse />);

    expect(screen.queryByText('Math')).toBeNull();
    expect(screen.queryByText('Science')).toBeNull();
  });

  it('does not render DeleteCourseItem component when currentUser is not set', () => {
    useSelector.mockReturnValueOnce(null);

    render(<DeleteCourse />);

    expect(screen.queryByText('Math')).toBeNull();
    expect(screen.queryByText('Science')).toBeNull();
  });

  it('renders CustomCarousel component when courses exist and currentUser is set', () => {
    render(<DeleteCourse />);

    expect(screen.getByTestId('')).toBeInTheDocument();
  });

  it('does not render CustomCarousel component when courses do not exist', () => {
    useSelector.mockReturnValueOnce({ courses: [] });

    render(<DeleteCourse />);

    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });

  it('does not render CustomCarousel component when currentUser is not set', () => {
    useSelector.mockReturnValueOnce(null);

    render(<DeleteCourse />);

    expect(screen.queryByTestId('custom-carousel')).toBeNull();
  });
});
