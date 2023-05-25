import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';
import DeleteCourseItem from '../components/CourseItem';
import CustomCarousel from '../components/CustomCarousel';

const DeleteCourse = () => {
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
        element: <DeleteCourseItem course={course} />,
        key: course.id,
      };
      coursesItems.push(item);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page">
      <CustomCarousel items={coursesItems} />
    </section>
  );
};

export default DeleteCourse;
