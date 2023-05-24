import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const Course = courses.find((c) => c.id === parseInt(id, 10));

  if (!Course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail">
      <h2>{Course.title}</h2>
      <img src={Course.img_url} alt={Course.title} className="course-detail__image" />
      <p>{Course.description}</p>
      <p>
        Price: $
        {Course.price}
      </p>
      <p>
        Duration:
        {Course.duration}
        {' '}
        minutes
      </p>
      <p>
        Instructor:
        {Course.instructor}
      </p>
    </div>
  );
};

export default Details;
