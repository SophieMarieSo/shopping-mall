import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showToastMessage } from '../common/uiSlice';
import api from '../../utils/api';
import { initialCart } from '../cart/cartSlice';

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await api.post('/auth/login', { email, password });
      sessionStorage.setItem('token', resp.data.token);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (token, { rejectWithValue }) => {}
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      sessionStorage.removeItem('token');

      dispatch(
        showToastMessage({
          message: '로그아웃 되었습니다.',
          status: 'success',
        })
      );

      return null;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const resp = await api.post('/user', { email, password, name });
      dispatch(
        showToastMessage({
          message: '회원가입에 성공했습니다',
          status: 'success',
        })
      );
      navigate('/login');

      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  'user/loginWithToken',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await api.get('/user/me');
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.user = action.payload.user;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginError = action.payload;
        state.loading = false;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.loginError = null;
        state.registrationError = null;
        state.success = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
