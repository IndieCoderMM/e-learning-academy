/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getCSRFToken from '../utils/getCSRFToken';

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const FETCHED_COURSES = 'courses/fetchCourses';
const CREATED_COURSE = 'courses/createCourse';
const apiEndpoint = '/api/courses';

export const fetchCourses = createAsyncThunk(FETCHED_COURSES, async () => {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    throw Error('Error fetching courses');
  }
});

export const createCourse = createAsyncThunk(
  CREATED_COURSE,
  async (courseData) => {
    const response = await axios.post(apiEndpoint, courseData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
    });

    if (!response.ok) {
      throw new Error('Error creating course!');
    }

    return response.data;
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
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const coursesActions = {
  fetchCourses,
  createCourse,
};

export default coursesSlice.reducer;
