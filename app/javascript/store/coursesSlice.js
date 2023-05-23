/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  courses: [], loading: false,
};

const FETCHED_COURSES = 'courses/fetchCourses';
const apiEndpoint = '/api/courses';

export const fetchCourses = createAsyncThunk(
  FETCHED_COURSES,
  async () => {
    try {
      const response = await axios.get(apiEndpoint);
      return response.data;
    } catch (error) {
      throw Error('Error fetching courses');
    }
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const coursesActions = {
  fetchCourses,
};

export default coursesSlice.reducer;
