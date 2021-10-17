function identifyRecipeType() {
  const { pathname } = window.location;
  let recipeType = 'comidas';
  if (pathname.includes('bebidas')) recipeType = 'bebidas';

  return recipeType;
}

export default identifyRecipeType;
