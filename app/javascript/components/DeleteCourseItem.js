import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FaGraduationCap, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { coursesActions } from '../store/coursesSlice';

const DeleteCourseItem = ({ course }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(coursesActions.destroyCourse(course.id));
  };

  return (
    <div key={course.id} className="course-card">
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
      <p>{course.description}</p>
      <div className="course-card__details">
        <div>
          <span className="course-card__icon">
            <FaMoneyBillAlt />
          </span>
          <p>
            $
            {course.price}
          </p>
        </div>
        <div>
          <span className="course-card__icon">
            <FaClock />
          </span>
          <p>
            {course.duration}
            {' '}
            minutes
          </p>
        </div>
        <div>
          <span className="course-card__icon">
            <FaGraduationCap />
          </span>
          <p>{course.instructor}</p>
        </div>
      </div>
      <Button
        type="button"
        className="w-100 d-flex align-items-center justify-content-center fw-bold"
        variant="outline-danger"
        onClick={handleDelete}
      >
        Delete Course
      </Button>
    </div>
  );
};

DeleteCourseItem.propTypes = {
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

export default DeleteCourseItem;
