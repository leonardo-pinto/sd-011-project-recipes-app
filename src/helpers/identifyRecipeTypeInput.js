import { drinkDetails, foodDetails } from './endpoints';

function identifyRecipeTypeInput() {
  const { pathname } = window.location;
  const id = pathname.split('/')[2];
  const url = pathname.includes('comidas')
    ? foodDetails
    : drinkDetails;
  return url.concat(id);
}

export default identifyRecipeTypeInput;
