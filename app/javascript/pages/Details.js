import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiLeftArrow } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { SlArrowRightCircle } from 'react-icons/sl';

const Details = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === parseInt(id, 10));
  const navigate = useNavigate();

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <section className="page">
      <h2 className="page__title">Course Details</h2>
      <div className="course-detail">
        <div className="course-detail__image-container">
          <img
            src={course.img_url}
            alt={course.title}
            className="course-detail__image"
          />
          <div className="carousel__control prev mt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="carousel__arrow"
            >
              <BiLeftArrow />
            </button>
          </div>
        </div>
        <div className="course-detail__details">
          <h2 className="mb-3">{course.title}</h2>
          <h3 className="fs-5">{course.description}</h3>
          <p>
            Price:
            {' '}
            <b>
              $
              {course.price}
            </b>
          </p>
          <p>
            Duration:
            <b>
              {course.duration}
              {' '}
              minutes
            </b>
          </p>
          <p>
            Instructor:
            <b>{course.instructor}</b>
          </p>
          <Button
            type="button"
            className="course-card__action reserve-btn btn-lg mx-auto my-3"
            onClick={() => navigate(`/new_reservation/${id}`)}
          >
            <BsFillBookmarkPlusFill className="me-1 fs-2" />
            Reserve Course
            <SlArrowRightCircle className="ms-1 fs-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Details;
