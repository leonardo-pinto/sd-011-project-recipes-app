import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const formsSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.userEmail;
      state.password = action.payload.userPassword;
    },
  },
});

export const { login } = formsSlice.actions;

export default formsSlice.reducer;
