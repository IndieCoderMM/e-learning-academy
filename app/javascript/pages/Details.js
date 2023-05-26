import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === parseInt(id, 10));

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail">
      <div className="course-detail__image-container">
        <img src={course.img_url} alt={course.title} className="course-detail__image" />
      </div>
      <div className="course-detail__details">
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
        <p>
          Instructor:
          {course.instructor}
        </p>
      </div>
    </div>
  );
};

export default Details;
