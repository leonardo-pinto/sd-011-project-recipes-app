import identifyRecipeType from './identifyRecipeType';

function createRecipeObject(foods, drinks) {
  const recipeType = identifyRecipeType();
  let recipeObject = {};
  if (recipeType === 'comidas') {
    recipeObject = {
      linkToGo: 'comidas',
      recipes: foods,
      type: 'meals',
      id: 'idMeal',
      name: 'strMeal',
      image: 'strMealThumb',
      category: 'strCategory',
      area: 'strArea',
      alcoholic: '',
      storage: 'meals',
    };
  } else {
    recipeObject = {
      linkToGo: 'bebidas',
      recipes: drinks,
      type: 'drinks',
      id: 'idDrink',
      name: 'strDrink',
      image: 'strDrinkThumb',
      category: 'strAlcoholic',
      area: '',
      alcoholic: 'strAlcoholic',
      storage: 'cocktails',
    };
  }
  return recipeObject;
}

export default createRecipeObject;
