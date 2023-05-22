import React from 'react';
import PropTypes from 'prop-types';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from 'react-icons/fa';

const ReservedCourse = ({ course, date, city }) => (
  <div className="reserved-item">
    <div>
      <img src={course.img_url} className="d-block w-100" alt="course cover" />
    </div>
    <h3 className="reserved-item__title">{course.title}</h3>
    <hr />
    <p>{course.description}</p>
    <div className="reserved-item__meta">
      <div>
        <span className="reserved-item__icon">
          <FaGraduationCap />
        </span>
        <p>{course.instructor}</p>
      </div>
      <div>
        <span className="reserved-item__icon">
          <FaMapMarkerAlt />
        </span>
        <p>{city}</p>
      </div>
      <div>
        <span className="reserved-item__icon">
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
