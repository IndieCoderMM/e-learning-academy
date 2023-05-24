import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../store/reservation';
import ReservedCourse from '../components/ReservedCourse';
import CustomCarousel from '../components/CustomCarousel';
import ReservationAlert from '../components/ReservationAlert';

function Reservation() {
  const reservationStatus = useSelector((state) => state.reservations.status);
  const reservationData = useSelector((state) => state.reservations.data);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let reservedItems = [];

  // Getting reserved courses from backend
  useEffect(() => {
    if (currentUser.id != null) {
      dispatch(getUserReservations(currentUser.id));
    }
  }, [currentUser.id, dispatch]);

  // Loading array of elements
  if (reservationData.length) {
    reservedItems = [];
    reservationData.forEach((reservation) => {
      const item = {
        element: (
          <ReservedCourse
            course={reservation.course}
            date={reservation.date}
            city={reservation.city}
          />
        ),
        key: reservation.id,
      };
      reservedItems.push(item);
    });
  }

  return (
    <section className="page">
      <h2 className="page__title">Enrolled Courses</h2>
      <ReservationAlert />
      {reservedItems.length > 0 && currentUser.id != null ? (
        <div>
          <p className="fs-5 text-muted">
            You have enrolled to <b>{reservedItems.length}</b> courses.
          </p>
          <CustomCarousel items={reservedItems} />
        </div>
      ) : null}
    </section>
  );
}

export default Reservation;
