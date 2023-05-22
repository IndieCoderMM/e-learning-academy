import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import reservationReducer from './reservation';

export default configureStore({
  reducer: {
    user: userReducer,
    reservations: reservationReducer,
  },
});
