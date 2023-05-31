import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { createNewReservation } from '../store/reservation';

const NewReservation = () => {
  const currentUser = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.courses);
  const { id } = useParams();
  const [selectedCourseId, setSelectedCourseId] = useState(id);
  const [alert, setAlert] = useState({ variant: '', message: '' });
  const reservationState = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityRef = useRef();
  const dateRef = useRef();

  const handleSelectChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.id == null) return;
    const courseId = parseInt(selectedCourseId, 10);
    const data = {
      user_id: currentUser.id,
      course_id: courseId,
      city: cityRef.current.value,
      date: dateRef.current.value,
    };

    dispatch(createNewReservation(data));
  };

  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses]);

  useEffect(() => {
    if (reservationState.status === 'created') navigate('/reservation');
    else if (reservationState.status === 'failed') {
      setAlert({ variant: 'danger', message: reservationState.error });
    } else if (currentUser.id == null) {
      setAlert({
        variant: 'info',
        message: 'Please log in to create a new reservation',
      });
    } else if (courses.length === 0) {
      setAlert({ variant: 'info', message: 'No courses available yet!' });
    } else {
      setAlert({ variant: '', message: '' });
    }
  }, [reservationState, navigate, courses, currentUser]);

  return (
    <section className="page form-page">
      <div className="styled-form-container">
        <h2 className="page__title">Make New Reservation</h2>

        {alert.message !== '' && (
          <Alert variant={alert.variant} className="py-1">
            {alert.message}
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
                value={selectedCourseId}
                onChange={handleSelectChange}
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
                min={new Date().toISOString().split('T')[0]}
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
};

export default NewReservation;
