import { configureStore } from '@reduxjs/toolkit';
import userLogin from './slices/user';
import fetchReceitas from './slices/fetchReceitas';

const store = configureStore({
  reducer: {
    userLogin,
    fetchReceitas,
  },
});

export default store;
