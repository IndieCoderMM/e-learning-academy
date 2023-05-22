import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaGraduationCap,
  FaClock,
  FaMoneyBillAlt,
} from 'react-icons/fa';
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
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="single-course">
          <img src={course.img_url} alt={course.title} className="d-block w-25" />
          <h2 className="reserved-item__title">{course.title}</h2>
          <p>{course.description}</p>
          <div className="course-details">
            <div>
              <span>
                <FaMoneyBillAlt />
                {' '}
              </span>
              <p>
                $
                {course.price}
              </p>
            </div>
            <div>
              <span>
                <FaClock />
              </span>
              <p>
                {course.duration}
                {' '}
                minutes
              </p>
            </div>
            <div>
              <span>
                <FaGraduationCap />
              </span>
              <p>{course.instructor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
