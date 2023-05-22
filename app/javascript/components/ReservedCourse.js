import React from 'react';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from 'react-icons/fa';

const ReservedCourse = ({ course, date, city }) => {
  return (
    <div className="reserved-item">
      <div>
        <img src={course.img_url} className="d-block w-100" />
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
};

export default ReservedCourse;
