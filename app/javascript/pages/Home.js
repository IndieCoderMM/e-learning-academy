import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);

  useEffect(() => {
    dispatch(coursesActions.fetchCourses());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Courses</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>
            Price: $
            {course.price}
          </p>
          <p>
            Duration:
            {course.duration}
            {' '}
            minutes
          </p>
          <img src={course.img_url} alt={course.title} />
          <p>
            Instructor:
            {course.instructor}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
