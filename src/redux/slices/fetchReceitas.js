import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  foods: [],
  drinks: [],
  foodCategories: [],
  drinksCategories: [],
  comidas: [],
  foodIngredients: [],
  foodByIngredients: [],
  foodAreaList: [],
  foodAreaFilter: [],
  drinkIngredients: [],
  drinkByIngredients: [],
  randomFoodRecipe: '',
  randomDrinkRecipe: '',
  loading: false,
  error: null,
  input: '',
  checkBoxCounter: 0,
  disabledButton: true,
};

// createAsyncThunk receives two parameters: 1) name of the slice, 2) function name that creates the createAsyncThunk
export const getRecipes = createAsyncThunk(
  'requisition/fetchRecipes',
  async (actionName, { getState }) => {
    const { fetchReceitas: { input } } = getState();
    const URLDictionary = {
      foods: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      filterByFoodCategorie:
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`,
      filterByDrinkCategorie:
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${input}`,
      foodIngredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      foodAreaList: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
      foodAreaFilter: `https:www.themealdb.com/api/json/v1/1/filter.php?a=${input}`,
      drinkIngredients: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      drinkAreaList: 'https://www.thecoktail.com/api/json/v1/1/list.php?a=list',
      foodCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      drinksCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      randomFoodRecipe: 'https://www.themealdb.com/api/json/v1/1/random.php',
      randomDrinkRecipe: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      foodByIngredients: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
      drinkByIngredients: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
      foodFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
      drinkFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
      foodByName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
      drinkByName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
      foodDetails: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${input}`,
      drinkDetails: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${input}`,
    };
    const response = await fetch(URLDictionary[actionName]).then((res) => res.json())
      .catch((error) => error);
    return {
      response,
      actionName,
    };
  },
);

export const foodsAction = [
  'foodByIngredients', 'foodFirstLetter', 'foodByName', 'filterByFoodCategorie',
];
export const drinksAction = [
  'drinkByIngredients', 'drinkFirstLetter', 'drinkByName', 'filterByDrinkCategorie',
];

const fetchReceitasSlice = createSlice({
  name: 'fetchRecipes',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setCheckBoxCounter: (state, action) => {
      state.checkBoxCounter = action.payload;
    },
    setDisableButton: (state, action) => {
      state.disabledButton = action.payload;
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.loading = true;
    },
    [getRecipes.fulfilled]: (state, action) => {
      const { actionName, response } = action.payload;
      state[actionName] = response;
      state.error = null;
      if (foodsAction.includes(actionName)) {
        state.foods = response;
        if (response.meals === null) state.error = 'Sem resultado';
      }
      if (drinksAction.includes(actionName)) {
        state.drinks = response;
        if (response.drinks === null) state.error = 'Sem resultado';
      }
      if (response instanceof Error) {
        state.error = response;
      }
      if (actionName === 'foodDetails' || actionName === 'drinkDetails') {
        state.data = response;
      }
      state.loading = false;
    },
    [getRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action;
    },
  },
});

export const {
  setInput, setCheckBoxCounter, setDisableButton } = fetchReceitasSlice.actions;

export default fetchReceitasSlice.reducer;
