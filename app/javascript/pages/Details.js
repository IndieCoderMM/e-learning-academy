import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === parseInt(id, 10));
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios
      .delete(`/api/courses/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_COURSE', payload: id });
      });
  };

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <img src={course.img_url} alt={course.title} className="course-detail__image" />
      <p>{course.description}</p>
      <p>
        Price: $
        {course.price}
      </p>
      <p>
        Duration:
        {' '}
        {course.duration}
        {' '}
        minutes
      </p>
      <p>
        Instructor:
        {' '}
        {course.instructor}
      </p>
      <button type="button" onClick={() => handleDelete}>Delete</button>
    </div>
  );
};

export default Details;
