import { configureStore } from '@reduxjs/toolkit';
import userLogin from './slices/user';
import fetchReceitas from './slices/fetchReceitas';
import localStorageRecipes from './slices/localStorageRecipes';

const store = configureStore({
  reducer: {
    userLogin,
    fetchReceitas,
    localStorageRecipes,
  },
});

export default store;
