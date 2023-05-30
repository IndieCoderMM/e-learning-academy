import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';
import DeleteCourseItem from '../components/DeleteCourseItem';
import CustomCarousel from '../components/CustomCarousel';
import DeleteCourseAlert from '../components/DeleteCourseAlert';
import LoadingSpinner from '../components/LoadingSpinner';

const DeleteCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);
  const currentUser = useSelector((state) => state.user);
  let coursesItems = [];

  useEffect(() => {
    if (currentUser.id != null) {
      dispatch(coursesActions.fetchCourses());
    }
  }, [currentUser.id, dispatch]);

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
    return <LoadingSpinner text="Updating the courses ..." />;
  }

  return (
    <section className="page">
      <h2 className="page__title">
        Delete Course (
        {coursesItems.length}
        {' '}
        Total)
      </h2>
      <DeleteCourseAlert />
      {coursesItems.length > 0 && currentUser.id != null ? (
        <CustomCarousel items={coursesItems} />
      ) : null}
    </section>
  );
};

export default DeleteCourse;
