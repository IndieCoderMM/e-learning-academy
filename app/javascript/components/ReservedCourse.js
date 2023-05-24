import React from 'react';
import PropTypes from 'prop-types';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from 'react-icons/fa';

const ReservedCourse = ({ course, date, city }) => (
  <div className="course-card">
    <div className="course-card__frame">
      <img
        src={course.img_url}
        alt={course.title}
        className="course-card__img"
      />
    </div>
    <h3 className="course-card__title">{course.title}</h3>
    <hr />
    <p>{course.description}</p>
    <div className="course-card__details">
      <div>
        <span className="course-card__icon">
          <FaGraduationCap />
        </span>
        <p>{course.instructor}</p>
      </div>
      <div>
        <span className="course-card__icon">
          <FaMapMarkerAlt />
        </span>
        <p>{city}</p>
      </div>
      <div>
        <span className="course-card__icon">
          <FaCalendarCheck />
        </span>
        <p>{date}</p>
      </div>
    </div>
  </div>
);

ReservedCourse.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default ReservedCourse;
