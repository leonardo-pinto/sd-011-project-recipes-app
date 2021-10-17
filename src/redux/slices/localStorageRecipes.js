import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: {},
    meals: {},
  },
};

const setStorage = (key, value) => { localStorage.setItem(key, JSON.stringify(value)); };

export const localStorageSlice = createSlice({
  name: 'localStorageRecipes',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteRecipes = [
        ...state.favoriteRecipes,
        action.payload,
      ];
      setStorage('favoriteRecipes', state.favoriteRecipes);
    },
    deleteFavorite: (state, action) => {
      state.favoriteRecipes = state.favoriteRecipes
        .filter(({ id }) => id !== action.payload);
      setStorage('favoriteRecipes', state.favoriteRecipes);
    },
    setInProgress: (state, action) => {
      const { id, type, progress } = action;
      state.inProgressRecipes = {
        ...state.inProgressRecipes,
        [type]: {
          ...state.inProgressRecipes[type],
          [id]: progress,
        },
      };
      setStorage('inProgressRecipes', state.inProgressRecipes);
    },
  },
});

export const { addFavorite, deleteFavorite, setInProgress } = localStorageSlice.actions;

export default localStorageSlice.reducer;
