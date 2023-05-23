import React from 'react';
import PropTypes from 'prop-types';
import {
  FaGraduationCap,
  FaClock,
  FaMoneyBillAlt,
} from 'react-icons/fa';

const CourseItem = ({ course }) => (
  <div key={course.id} className="single-course">
    <img src={course.img_url} alt={course.title} className="d-block w-50 h-50" style={{ height: '100 px' }} />
    <h3 className="reserved-item__title">{course.title}</h3>
    <p>{course.description}</p>
    <div className="course-details">
      <div className="course-info">
        <span className="reserved-item__icon">
          <FaMoneyBillAlt />
          {' '}
        </span>
        <p>
          $
          {course.price}
        </p>
      </div>
      <div className="course-info">
        <span className="reserved-item__icon">
          <FaClock />
        </span>
        <p>
          {course.duration}
          {' '}
          minutes
        </p>
      </div>
      <div className="course-info">
        <span className="reserved-item__icon">
          <FaGraduationCap />
        </span>
        <p>{course.instructor}</p>
      </div>
    </div>
  </div>
);

CourseItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseItem;
