function redirectOneRecipe(data, setRedirectURL) {
  if (Object.keys(data).length > 0) {
    const { pathname } = window.location;
    const recipeURL = pathname.split('/')[1];
    if (data.meals !== null && recipeURL === 'comidas' && data.meals.length === 1) {
      const { meals } = data;
      const { idMeal } = meals[0];
      setRedirectURL(`/${recipeURL}/${idMeal}`);
    } else if (data.drinks !== null && recipeURL === 'bebidas'
        && data.drinks.length === 1) {
      const { drinks } = data;
      const { idDrink } = drinks[0];
      setRedirectURL(`/${recipeURL}/${idDrink}`);
    }
  }
}

export default redirectOneRecipe;
