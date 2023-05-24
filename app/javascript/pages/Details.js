import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const Course = courses.find((c) => c.id === parseInt(id));

  if (!Course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail">
      <h2>{Course.title}</h2>
      <img src={Course.img_url} alt={Course.title} className="course-detail__image" />
      <p>{Course.description}</p>
      <p>Price: ${Course.price}</p>
      <p>Duration: {Course.duration} minutes</p>
      <p>Instructor: {Course.instructor}</p>
    </div>
  );
};

Details.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      img_url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      instructor: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Details;