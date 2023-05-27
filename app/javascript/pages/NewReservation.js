import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
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
    <section className="page form-page">
      <div className="styled-form-container">
        <h2 className="page__title">Make New Reservation</h2>
        {currentUser.id == null && (
          <Alert variant="primary" className="py-1">
            Please log in to create a new reservation.
          </Alert>
        )}

        {alert !== '' && (
          <Alert variant="danger" className="py-1">
            {alert}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="styled-form">
          <div className="styled-form__field">
            <label htmlFor="username">
              Username
              <input
                id="username"
                type="text"
                value={currentUser.name}
                placeholder="Log in to fill this field"
                className="styled-form__input"
                readOnly
              />
            </label>
          </div>
          <div className="styled-form__field">
            <label htmlFor="course-select">
              Select Class
              <select
                id="course-select"
                className="styled-form__input"
                ref={courseRef}
              >
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                    className="text-dark"
                  >
                    {course.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="styled-form__field">
            <label htmlFor="city">
              Enter Study Location
              <input
                id="city"
                type="text"
                ref={cityRef}
                className="styled-form__input"
                placeholder="Enter preferred location"
                required
              />
            </label>
          </div>
          <div className="styled-form__field">
            <label htmlFor="date">
              Select Date
              <input
                id="date"
                type="date"
                ref={dateRef}
                className="styled-form__input"
                placeholder="Select Date"
                required
              />
            </label>
          </div>
          <div className="d-flex gap-2 justify-content-center w-100 mt-3">
            <button
              type="button"
              className="styled-form__action"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="styled-form__action">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewReservation;
