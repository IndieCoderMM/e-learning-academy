import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';
import DeleteCourseItem from '../components/DeleteCourseItem';
import CustomCarousel from '../components/CustomCarousel';
import DeleteCourseAlert from '../components/DeleteCourseAlert';

const DeleteCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const currentUser = useSelector((state) => state.user);
  let coursesItems = [];

  useEffect(() => {
    if (currentUser.id != null) {
      if ((courses.length > 0
          && courses[0].user_id !== currentUser.id)
      ) {
        dispatch(coursesActions.fetchCourses());
      }
    }
  }, [dispatch, courses, currentUser.id]);

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

  return (
    <section className="page">
      <DeleteCourseAlert />
      {coursesItems.length > 0 && currentUser.id != null ? (
        <CustomCarousel items={coursesItems} />
      ) : null}
    </section>
  );
};

export default DeleteCourse;
