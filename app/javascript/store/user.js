import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getCSRFToken = () => {
  const csrfTag = document.querySelector('meta[name=csrf-token]');
  return csrfTag ? csrfTag.content : '';
};

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
    console.log(data);
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
    console.log(data);
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
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'success',
          name: action.payload.name,
          id: action.payload.id,
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return { ...state, status: 'error', error: action.payload.message };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'success',
          name: action.payload.name,
          id: action.payload.id,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return { ...state, status: 'error', error: action.payload.message };
      });
  },
});

export default userSlice.reducer;
