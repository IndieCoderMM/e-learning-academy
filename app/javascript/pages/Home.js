import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';
import CourseItem from '../components/CourseItem';
import CustomCarousel from '../components/CustomCarousel';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);
  let coursesItems = [];

  useEffect(() => {
    dispatch(coursesActions.fetchCourses());
  }, [dispatch]);

  if (courses.length) {
    coursesItems = [];
    courses.forEach((course) => {
      const item = {
        element: <CourseItem course={course} />,
        key: course.id,
      };
      coursesItems.push(item);
    });
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="page">
      <h2 className="page__title">
        Featured Courses&nbsp;
        <small>
          (
          <b>{coursesItems.length}</b>
          &nbsp;Available)
        </small>
      </h2>
      <CustomCarousel items={coursesItems} />
    </section>
  );
};

export default Home;
