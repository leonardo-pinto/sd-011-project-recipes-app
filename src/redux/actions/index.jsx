export const FETCH_MEALS_STARTED = 'FETCH_MEALS_STARTED';
export const FETCH_MEALS_SUCESS = 'FETCH_MEALS_SUCESS';
export const FETCH_MEALS_ERROR = 'FETCH_MEALS_ERROR';
export const FETCH_DRINKS_STARTED = 'FETCH_DRINKS_STARTED';
export const FETCH_DRINKS_SUCESS = 'FETCH_DRINKS_SUCESS';
export const FETCH_DRINKS_ERROR = 'FETCH_DRINKS_ERROR';
export const FETCH_BOTH_STARTED = 'FETCH_BOTH_STARTED';
export const FETCH_BOTH_SUCESS = 'FETCH_BOTH_SUCESS';
export const FETCH_BOTH_ERROR = 'FETCH_BOTH_ERROR';
export const FETCH_MEALS_CATEGORIES_STARTED = 'FETCH_MEALS_CATEGORY_STARTED';
export const FETCH_MEALS_CATEGORIES_SUCESS = 'FETCH_MEALS_CATEGORIES_SUCESS';
export const FETCH_MEALS_CATEGORIES_ERROR = 'FETCH_MEALS_CATEGORIES_ERROR';
export const FETCH_DRINKS_CATEGORIES_STARTED = 'FETCH_DRINKS_CATEGORIES_STARTED';
export const FETCH_DRINKS_CATEGORIES_SUCESS = 'FETCH_DRINKS_CATEGORIES_SUCESS';
export const FETCH_DRINKS_CATEGORIES_ERROR = 'FETCH_DRINKS_CATEGORIES_ERROR';
export const FETCH_MEALS_BY_CATEGORIES_STARTED = 'FETCH_MEALS_BY_CATEGORIES_STARTED';
export const FETCH_MEALS_BY_CATEGORIES_SUCESS = 'FETCH_MEALS_BY_CATEGORIES_SUCESS';
export const FETCH_MEALS_BY_CATEGORIES_ERROR = 'FETCH_MEALS_BY_CATEGORIES_ERROR';
export const FETCH_DRINKS_BY_CATEGORIES_STARTED = 'FETCH_DRINKS_BY_CATEGORIES_STARTED';
export const FETCH_DRINKS_BY_CATEGORIES_SUCESS = 'FETCH_DRINKS_BY_CATEGORIES_SUCESS';
export const FETCH_DRINKS_BY_CATEGORIES_ERROR = 'FETCH_DRINKS_BY_CATEGORIES_ERROR';
export const INPUT_HANDLE = 'INPUT_HANDLE';
export const RENDER_FILTER = 'RENDER_FILTER';
export const TOOGLE_DRINKS_CATEGORIES = 'TOOGLE_DRINKS_CATEGORIES';
export const SELECTED_DRINK_CATEGORY = 'SELECTED_DRINK_CATEGORY';
export const TOOGLE_MEALS_CATEGORIES = 'TOOGLE_MEALS_CATEGORIES';
export const SELECTED_MEAL_CATEGORY = 'SELECTED_MEAL_CATEGORY';
export const MEALS_BY_AREA = 'MEALS_BY_AREA';

export const fetchMealStarted = () => ({
  type: FETCH_MEALS_STARTED,
});

export const fetchMealSucess = (payload) => ({
  type: FETCH_MEALS_SUCESS,
  payload,
});

export const fetchMealError = (payload) => ({
  type: FETCH_MEALS_ERROR,
  payload,
});

export const fetchDrinkStarted = () => ({
  type: FETCH_DRINKS_STARTED,
});

export const fetchDrinkSucess = (payload) => ({
  type: FETCH_DRINKS_SUCESS,
  payload,
});

export const fetchDrinkError = (payload) => ({
  type: FETCH_DRINKS_ERROR,
  payload,
});

export const fetchBothStarted = () => ({
  type: FETCH_BOTH_STARTED,
});

export const fetchBothSucess = (payload) => ({
  type: FETCH_BOTH_SUCESS,
  payload,
});

export const fetchBothError = (payload) => ({
  type: FETCH_BOTH_ERROR,
  payload,
});

export const fetchMealsCategoriesStarted = () => ({
  type: FETCH_MEALS_CATEGORIES_STARTED,
});

export const fetchMealsCategoriesSucess = (payload) => ({
  type: FETCH_MEALS_CATEGORIES_SUCESS,
  payload,
});

export const fetchMealsCategoriesError = (payload) => ({
  type: FETCH_MEALS_CATEGORIES_ERROR,
  payload,
});

export const fetchDrinksCategoriesStarted = () => ({
  type: FETCH_DRINKS_CATEGORIES_STARTED,
});

export const fetchDrinksCategoriesSucess = (payload) => ({
  type: FETCH_DRINKS_CATEGORIES_SUCESS,
  payload,
});

export const fetchDrinksCategoriesError = (payload) => ({
  type: FETCH_DRINKS_CATEGORIES_ERROR,
  payload,
});

export const fetchMealsByCategoriesStarted = () => ({
  type: FETCH_MEALS_BY_CATEGORIES_STARTED,
});

export const fetchMealsByCategoriesSucess = (payload) => ({
  type: FETCH_MEALS_BY_CATEGORIES_SUCESS,
  payload,
});

export const fetchMealsByCategoriesError = (payload) => ({
  type: FETCH_MEALS_BY_CATEGORIES_ERROR,
  payload,
});

export const fetchDrinksByCategoriesStarted = () => ({
  type: FETCH_DRINKS_BY_CATEGORIES_STARTED,
});

export const fetchDrinksByCategoriesSucess = (payload) => ({
  type: FETCH_DRINKS_BY_CATEGORIES_SUCESS,
  payload,
});

export const fetchDrinksByCategoriesError = (payload) => ({
  type: FETCH_DRINKS_BY_CATEGORIES_ERROR,
  payload,
});

export const filterHandle = ({ name, value }) => ({
  type: INPUT_HANDLE,
  name,
  value,
});

export const renderFilter = (payload) => ({
  type: RENDER_FILTER,
  payload,
});

export const setDrinkToogle = (payload) => ({
  type: TOOGLE_DRINKS_CATEGORIES,
  payload,
});

export const getDrinkCategory = (payload) => ({
  type: SELECTED_DRINK_CATEGORY,
  payload,
});

export const setMealToogle = (payload) => ({
  type: TOOGLE_MEALS_CATEGORIES,
  payload,
});

export const getMealCategory = (payload) => ({
  type: SELECTED_MEAL_CATEGORY,
  payload,
});

export const getMealsByArea = (payload) => ({
  type: MEALS_BY_AREA,
  payload,
});

export const fetchMeal = (url) => async (dispatch) => {
  try {
    dispatch(fetchMealStarted());
    const response = await fetch(url);
    const data = await response.json();
    return dispatch(fetchMealSucess(data));
  } catch (error) {
    dispatch(fetchMealError(error.message));
  }
};

export const fetchDrink = (url) => async (dispatch) => {
  try {
    dispatch(fetchDrinkStarted());
    const response = await fetch(url);
    const data = await response.json();
    return dispatch(fetchDrinkSucess(data));
  } catch (error) {
    dispatch(fetchDrinkError(error.message));
  }
};

export const fetchMealsCategories = () => async (dispatch) => {
  try {
    dispatch(fetchMealsCategoriesStarted());
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return dispatch(fetchMealsCategoriesSucess(data));
  } catch (error) {
    dispatch(fetchMealsCategoriesError(error.message));
  }
};

export const fetchExploreMealsArea = (url) => (dispatch) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch(getMealsByArea(data)));
};

export const fetchDrinksCategories = () => async (dispatch) => {
  try {
    dispatch(fetchDrinksCategoriesStarted());
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return dispatch(fetchDrinksCategoriesSucess(data));
  } catch (error) {
    dispatch(fetchDrinksCategoriesError(error.message));
  }
};

export const fetchMealsByCategories = (category) => async (dispatch) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  try {
    dispatch(fetchMealsByCategoriesStarted());
    const response = await fetch(`${url}${encodeURIComponent(category)}`);
    const data = await response.json();
    return dispatch(fetchMealsByCategoriesSucess(data));
  } catch (error) {
    dispatch(fetchMealsByCategoriesError(error.message));
  }
};

export const fetchDrinksByCategories = (category) => async (dispatch) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  try {
    dispatch(fetchDrinksByCategoriesStarted());
    const response = await fetch(`${url}${category}`);
    const data = await response.json();
    return dispatch(fetchDrinksByCategoriesSucess(data));
  } catch (error) {
    dispatch(fetchDrinksByCategoriesError(error.message));
  }
};

export const fetchApi = (url) => async (dispatch) => {
  try {
    dispatch(fetchBothStarted());
    const response = await fetch(url);
    const data = await response.json();
    return dispatch(fetchBothSucess(data));
  } catch (error) {
    dispatch(fetchBothError(error.message));
  }
};
