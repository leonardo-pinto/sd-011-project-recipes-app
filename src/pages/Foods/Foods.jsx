import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './Foods.module.css';
import { fetchMeal } from '../../redux/actions';
import FoodsCategories from './FoodsComponents/FoodsCategories';
import Picture from '../../images/loginIMG.png';

function Foods({ match, location }) {
  const { meals, isLoading } = useSelector((state) => state.Meals);
  const { data, render } = useSelector((state) => state.Filter);
  const { mealsByCategories, toogle } = useSelector((state) => state.MealsByCategories);
  const dispatch = useDispatch();
  const mn = 12;

  React.useEffect(() => {
    async function getMeals(url) {
      await dispatch(fetchMeal(url));
    }
    if (location.ingredient) {
      getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${location.ingredient}`);
    } else {
      getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [dispatch, location.ingredient]);

  function renderFoods() {
    if (render && data.meals) {
      return (
        <div className={ `${styles.foodsCardContainer} animeLeft` }>
          {data.meals && data.meals.filter((_, index) => index < mn)
            .map((item, index) => (
              <section
                key={ index }
              >
                <Link to={ `/comidas/${item.idMeal}` }>
                  <div
                    data-testid={ `${index}-recipe-card` }
                    className={ `${styles.cardDiv} animeLeft` }
                  >
                    <img
                      src={ item.strMealThumb }
                      alt="thumbnail"
                      data-testid={ `${index}-card-img` }
                      className={ styles.cardImg }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                      className={ styles.itemName }
                    >
                      {item.strMeal}
                    </p>
                  </div>
                </Link>
              </section>
            ))}
        </div>
      );
    // } if (render && !isLoading && !data.meals) {
    //   // eslint-disable-next-line no-alert
    //   // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    //   return (
    //     <h2
    //       className={ styles.noMealsFound }
    //     >
    //       No meals with this parameter were found.
    //     </h2>
    //   );
    }
    return (
      <div className={ `${styles.foodsCardContainer} animeLeft` }>
        {meals.meals && meals.meals.filter((_, index) => index < mn)
          .map((item, index) => (
            <Link
              key={ index }
              to={ `/comidas/${item.idMeal}` }
            >
              <section
                data-testid={ `${index}-recipe-card` }
                className={ `${styles.cardDiv} animeLeft` }
              >
                <img
                  src={ item.strMealThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className={ styles.itemName }
                >
                  {item.strMeal}
                </p>
              </section>
            </Link>
          ))}
      </div>
    );
  }

  function renderByCategories() {
    return (
      <div className={ `${styles.foodsCardContainer} animeLeft` }>
        {mealsByCategories.meals && mealsByCategories.meals
          .filter((_, index) => index < mn)
          .map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className={ `${styles.cardDiv} animeLeft` }
            >
              <div>
                <img
                  src={ item.strMealThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className={ styles.itemName }
                >
                  {item.strMeal}
                </p>
              </div>
            </Link>
          ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={ styles.loadingContainer }>
        <img
          src={ Picture }
          alt="Prato de comida"
          className={ styles.rotation }
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header title="Foods" glass="true" match={ match } />
      <FoodsCategories />
      {toogle ? renderByCategories() : renderFoods()}
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    ingredient: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Foods;
