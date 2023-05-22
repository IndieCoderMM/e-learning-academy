import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../store/reservation';
import ReservedCourse from '../components/ReservedCourse';
import CustomCarousel from '../components/CustomCarousel';

function Reservation() {
  const reservationStatus = useSelector((state) => state.reservations.status);
  const reservationData = useSelector((state) => state.reservations.data);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let reservedItems = [];

  // Getting reserved courses from backend
  useEffect(() => {
    if (reservationStatus === 'idle') {
      dispatch(getUserReservations(currentUser.id));
    }
  }, [reservationStatus, dispatch]);

  // Loading array of elements
  if (reservationData.length) {
    reservedItems = [];
    reservationData.forEach((item) => {
      const elem = (
        <ReservedCourse
          course={item.course}
          date={item.date}
          city={item.city}
        />
      );
      reservedItems.push(elem);
    });
  }

  return (
    <div className="reservation-page">
      <h2 className="page-title">Enrolled Courses</h2>
      {reservedItems.length ? (
        <div>
          <p className="fs-5 text-muted">
            You have enrolled to {reservedItems.length} courses.
          </p>
          <CustomCarousel items={reservedItems} />
        </div>
      ) : (
        <div>
          <Alert variant="info">You haven't enrolled to any courses yet!</Alert>
        </div>
      )}
    </div>
  );
}

export default Reservation;
