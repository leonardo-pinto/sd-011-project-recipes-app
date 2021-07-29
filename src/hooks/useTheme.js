import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const THEMES = {
  light: {
    name: 'light',
    colors: {
      background: '#fafafa',
      primary: '#7874fa',
      text400: 'red',
    },
    fonts: {
      bold: 700,
    },
  },
};

const initialState = THEMES.light;

const reducers = {
  changeTheme: (state, { payload }) => {
    state = THEMES[payload];
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers,
});

export const { changeTheme } = themeSlice.actions;

export const { reducer } = themeSlice;

export const useTheme = () => useSelector((state) => state.theme);
