import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCSRFToken from '../utils/getCSRFToken';

export const getUserReservations = createAsyncThunk(
  'reservations/getUserReservations',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}/reservations`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
);

export const createNewReservation = createAsyncThunk(
  'reservations/createNewReservation',
  async (formData) => {
    const res = await fetch(`/api/users/${formData.user_id}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ userId, id }) => {
    const res = await fetch(`/api/users/${userId}/reservations/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': getCSRFToken(),
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete reservation');
    }
  },
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(createNewReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(createNewReservation.fulfilled, (state) => ({
        ...state,
        status: 'created',
      }))
      .addCase(createNewReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(getUserReservations.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(getUserReservations.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        data: action.payload,
      }))
      .addCase(getUserReservations.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteReservation.fulfilled, (state) => ({
        ...state,
        status: 'deleted',
      }))
      .addCase(deleteReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default reservationSlice.reducer;
