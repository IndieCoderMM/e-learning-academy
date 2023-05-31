import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../store/reservation';
import ReservedCourse from '../components/ReservedCourse';
import CustomCarousel from '../components/CustomCarousel';
import ReservationAlert from '../components/ReservationAlert';
import LoadingSpinner from '../components/LoadingSpinner';

const Reservation = () => {
  const reservationState = useSelector((state) => state.reservations);
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
  if (reservationState.data.length) {
    reservedItems = [];
    reservationState.data.forEach((reservation) => {
      const item = {
        element: (
          <ReservedCourse
            id={reservation.id}
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

  if (reservationState.status === 'loading') {
    return <LoadingSpinner text="Checking your reservations ..." />;
  }

  return (
    <section className="page">
      <h2 className="page__title">Scheduled Classes</h2>
      <ReservationAlert />
      {reservedItems.length > 0 && currentUser.id != null ? (
        <div>
          <p className="fs-5 text-muted">
            You currently have
            {' '}
            <b>{reservedItems.length}</b>
            {' '}
            study sessions
            scheduled.
          </p>
          <CustomCarousel items={reservedItems} />
        </div>
      ) : null}
    </section>
  );
};

export default Reservation;
