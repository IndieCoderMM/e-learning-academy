import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserReservations = createAsyncThunk(
  'reservations/getUserReservations',
  async (userId) => {
    const response = await fetch(`/users/${userId}/reservations`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
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
      }));
  },
});

export default reservationSlice.reducer;
