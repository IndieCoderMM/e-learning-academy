import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import reservationReducer from './reservation';
import coursesReducer from './coursesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    reservations: reservationReducer,
    courses: coursesReducer,
  },
});
