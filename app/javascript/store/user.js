import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCSRFToken from '../utils/getCSRFToken';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username }) => {
    const res = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify({ user: { name: username } }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username }) => {
    const res = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify({ user: { name: username } }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  },
);

const initialState = {
  status: 'idle',
  name: '',
  id: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser(state) {
      return {
        ...state,
        status: 'idle',
        name: '',
        id: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        name: action.payload.name,
        id: action.payload.id,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        name: action.payload.name,
        id: action.payload.id,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
