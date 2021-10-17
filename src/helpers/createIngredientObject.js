function createIngredientObject(recipeType) {
  let ingredientObject = {};
  if (recipeType === 'comidas') {
    ingredientObject = {
      ingredientKey: 'strIngredient',
      imageURL: 'themealdb',
      dataKey: 'meals',
    };
  } else {
    ingredientObject = {
      ingredientKey: 'strIngredient1',
      imageURL: 'thecocktaildb',
      dataKey: 'drinks',
    };
  }
  return ingredientObject;
}

export default createIngredientObject;
