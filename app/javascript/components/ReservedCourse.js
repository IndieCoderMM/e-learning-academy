import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from 'react-icons/fa';
import { SiCheckmarx } from 'react-icons/si';
import { MdCancel } from 'react-icons/md';
import { deleteReservation, getUserReservations } from '../store/reservation';

const ReservedCourse = ({
  id, course, date, city,
}) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReservation({ userId, id })).then(() => dispatch(getUserReservations(userId)));
  };

  return (
    <div className="course-card">
      <div className="course-card__frame">
        <img
          src={course.img_url}
          alt={course.title}
          className="course-card__img"
        />
      </div>
      <Link to={`/courses/${course.id}`} className="course-card__title">
        {course.title}
      </Link>
      <hr className="course-card__hr" />
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
      <div className="d-flex justify-content-center gap-1 w-100">
        <Button
          type="button"
          className="w-100 d-flex align-items-center justify-content-center"
          variant="outline-danger"
          onClick={handleDelete}
        >
          {' '}
          <MdCancel />
          Cancel
        </Button>
        <Button
          type="button"
          className="w-100 d-flex align-items-center justify-content-center"
          variant="outline-success"
          onClick={handleDelete}
        >
          {' '}
          <SiCheckmarx />
          Complete
        </Button>
      </div>
    </div>
  );
};

ReservedCourse.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default ReservedCourse;
