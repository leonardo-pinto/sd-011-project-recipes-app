const URLDictionary = {
  allFoods: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  allDrinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  allFoodsCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  allDrinksCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  randomFoodRecipe: 'https://www.themealdb.com/api/json/v1/1/random.php',
  randomDrinkRecipe: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  filterByFoodCategorie:
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=', // input
  filterByDrinkCategorie:
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=', // input
  foodsIngredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  foodAreaList: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  foodAreaFilter: 'https:www.themealdb.com/api/json/v1/1/filter.php?a=', // input
  drinksIngredients: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
  drinkAreaList: 'https://www.thecoktail.com/api/json/v1/1/list.php?a=list',
  foodByIngredients: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=', // input
  drinkByIngredients: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=', // input
  foodFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=', // input
  drinkFirstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=', // input
  foodByName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=', // input
  drinkByName: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', // input
  foodDetails: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=', // input
  drinkDetails: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', // input
};

export default URLDictionary;

export const {
  allFoods,
  allDrinks,
  allFoodsCategories,
  allDrinksCategories,
  foodsIngredients,
  drinksIngredients,
  randomFoodRecipe,
  randomDrinkRecipe,
  foodDetails,
  drinkDetails,
} = URLDictionary;
