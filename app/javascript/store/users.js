import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const logInUser = createAsyncThunk(
  'users/login',
  async ({ username }) => {
    const res = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  },
);

export const registerUser = createAsyncThunk(
  'users/register',
  async ({ username }) => {
    const res = await fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  },
);

const initialState = {
  status: 'idle',
  name: '',
  id: null,
  error: '',
  message: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        return { ...state, name: action.payload.name, id: action.payload.id };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return { ...state, status: 'error', error: action.payload.errors };
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'success',
          name: action.payload.name,
          id: action.payload.id,
        };
      })
      .addCase(logInUser.rejected, (state, action) => {
        return { ...state, status: 'error', error: action.payload.errors };
      });
  },
});

export default userSlice.reducer;
