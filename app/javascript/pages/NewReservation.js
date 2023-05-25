import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Alert } from 'react-bootstrap';
import { createNewReservation } from '../store/reservation';

function NewReservation() {
  const currentUser = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.courses);
  const [alert, setAlert] = useState('');
  const reservationState = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseRef = useRef();
  const cityRef = useRef();
  const dateRef = useRef();

  const handleSubmit = (e) => {
    if (currentUser.id == null) return;
    e.preventDefault();
    const data = {
      user_id: currentUser.id,
      course_id: parseInt(courseRef.current.value, 10),
      city: cityRef.current.value,
      date: dateRef.current.value,
    };

    dispatch(createNewReservation(data));
  };

  useEffect(() => {
    if (reservationState.status === 'created') navigate('/reservation');
    else if (reservationState.status === 'failed') {
      setAlert(reservationState.error);
    } else setAlert('');
  }, [reservationState, navigate]);

  return (
    <section className="page reserve-form-page">
      <h2 className="page__title">Create a new reservation</h2>
      {currentUser.id == null && (
        <Alert variant="primary">
          Please log in to create a new reservation.
        </Alert>
      )}

      {alert !== '' && <Alert variant="danger">{alert}</Alert>}

      <form onSubmit={handleSubmit} className="reserve-form">
        <div className="reserve-form__field">
          <label htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              value={currentUser.name}
              className="reserve-form__input"
              readOnly
            />
          </label>
        </div>
        <div className="reserve-form__field">
          <label htmlFor="course-select">
            Course
            <select
              id="course-select"
              className="reserve-form__input"
              ref={courseRef}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id} className="text-dark">
                  {course.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="reserve-form__field">
          <label htmlFor="city">
            City
            <input
              id="city"
              type="text"
              ref={cityRef}
              className="reserve-form__input"
              placeholder="Enter City"
              required
            />
          </label>
        </div>
        <div className="reserve-form__field">
          <label htmlFor="date">
            Date
            <input
              id="date"
              type="date"
              ref={dateRef}
              className="reserve-form__input"
              placeholder="Select Date"
              required
            />
          </label>
        </div>
        <div className="d-flex gap-2 justify-content-center w-100 mt-3">
          <button type="button" className="reserve-form__action">
            Cancel
          </button>
          <button type="submit" className="reserve-form__action">
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewReservation;
