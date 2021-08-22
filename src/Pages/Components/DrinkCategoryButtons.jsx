import React from 'react';
import { CategoryDrinksAPI, CategoryDrinkFilter } from '../../services/CategoryDrinksAPI';
import Context from '../../Context_Configs/Context';
import '../../styles/drinksCategoryButtons.css';

export default function DrinkCategoryButtons() {
  const categories = 5;

  const { setDrinksForCategory, setRenderCategory } = React.useContext(Context);
  const [drinkCategories, setDrinkCategories] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState('');

  React.useEffect(() => {
    async function fetchDrinkParams() {
      const categoryDrink = await CategoryDrinksAPI();
      setDrinkCategories(categoryDrink);
    }
    fetchDrinkParams();
  }, []);

  async function requestDrinksComingFromCategories({ target }) {
    setSelectedCategory(target.innerHTML);
    const lastCategory = selectedCategory;

    if (target.innerHTML === lastCategory || target.innerHTML === 'All') {
      setRenderCategory(true);
    } else {
      const twelveItems = 12;
      const drinks = await CategoryDrinkFilter(target.innerHTML);

      setDrinksForCategory(drinks && drinks
        .drinks.filter((_, index) => index < twelveItems));
      setRenderCategory(false);
    }
  }

  return (
    <div className="container-fluid ">
      <section className="d-flex flex-wrap justify-content-center my-2">
        {drinkCategories && drinkCategories.filter((_, index) => index < categories)
          .map((category, index) => (
            <button
              onClick={ (e) => requestDrinksComingFromCategories(e) }
              className="button col-5 mb-1 mx-1"
              type="button"
              key={ index }
              data-testid={ `${category}-category-filter` }
            >
              {/* {switch()} */}
              {category.includes('Unknown') ? 'Other / Unknown' : category}
              {/* {category} */}
            </button>
          ))}
        <button
          type="button"
          className="button col-5 mb-1 mx-1"
          onClick={ (e) => requestDrinksComingFromCategories(e) }
          data-testid="All-category-filter"
        >
          All
        </button>
      </section>
    </div>
  );
}
