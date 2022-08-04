import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  auth: {},
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.auth = {
        isLogged: false,
        token: null,
        refreshToken: null,
        refreshTokenExpiredDate: null,
        type: null,
      };
      state.user = null;
    },
  },
});

export const {setAuth, setUser, logout} = authSlice.actions;

export default authSlice.reducer;
