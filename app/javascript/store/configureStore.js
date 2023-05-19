import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import coursesReducer from './coursesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
  },
});
