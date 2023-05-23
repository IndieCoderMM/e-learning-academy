import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';
import CourseItem from '../components/CourseItem';
import CustomCarousel from '../components/CustomCarousel';

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
        element: (
          <CourseItem
            course={course}
          />
        ),
        key: course.id,
      };
      coursesItems.push(item);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="courses-section">
      <h1 className="all-courses">
        All available courses:
        {' '}
        <b>{coursesItems.length}</b>
      </h1>
      <CustomCarousel items={coursesItems} />
    </div>
  );
};

export default Home;
