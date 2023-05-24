import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewReservation } from '../store/reservation';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NewReservation() {
  const currentUser = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.courses);
  const reservationStatus = useSelector((state) => state.reservations.status);
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
    console.log(data);
    dispatch(createNewReservation(data));
  };

  useEffect(() => {
    if (reservationStatus === 'created') navigate('/reservation');
  }, [reservationStatus]);

  return (
    <section className="page reserve-form-page">
      <h2 className="page__title">Create a new reservation</h2>
      <form onSubmit={handleSubmit} className="reserve-form">
        <div className="reserve-form__field">
          <label>Username</label>
          <input
            type="text"
            value={currentUser.name}
            className="reserve-form__input"
            readOnly
          />
        </div>
        <div className="reserve-form__field">
          <label>Course</label>
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
        </div>
        <div className="reserve-form__field">
          <label>City</label>
          <input
            type="text"
            ref={cityRef}
            className="reserve-form__input"
            placeholder="Enter City"
            required
          />
        </div>
        <div className="reserve-form__field">
          <label>Date</label>
          <input
            type="date"
            ref={dateRef}
            className="reserve-form__input"
            placeholder="Select Date"
            required
          />
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

{
  /* <a href="https://www.flaticon.com/free-icons/dropdown-arrow" title="dropdown arrow icons">Dropdown arrow icons created by Arkinasi - Flaticon</a> */
}

export default NewReservation;
