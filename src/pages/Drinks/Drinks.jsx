import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import styles from './Drinks.module.css';
import { fetchDrink } from '../../redux/actions';
import DrinksCategoriesComponent from './DrinksComponents/DrinksCategoriesComponent';
import Picture from '../../images/loginIMG.png';

function Drinks({ match, location }) {
  const { isLoading, drinks } = useSelector((state) => state.Drinks);
  const { data, render } = useSelector((state) => state.Filter);
  const { drinksByCategories, toogle } = useSelector((state) => state.DrinksByCategories);
  const dispatch = useDispatch();
  const mn = 12;

  React.useEffect(() => {
    async function getDrinks(url) {
      await dispatch(fetchDrink(url));
    }
    if (location.ingredient) {
      console.log(location.ingredient);
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${location.ingredient}`);
    } else {
      getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [dispatch, location.ingredient]);

  function renderDrinks() {
    if (render && data.drinks) {
      return (
        <div className={ `${styles.drinksCardContainer} animeLeft` }>
          {data.drinks && data.drinks.filter((_, index) => index < mn)
            .map((item, index) => (
              <section
                key={ index }
              >
                <Link to={ `/bebidas/${item.idDrink}` }>
                  <div
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                    className={ `${styles.cardDiv} animeLeft` }
                  >
                    <img
                      src={ item.strDrinkThumb }
                      alt="thumbnail"
                      data-testid={ `${index}-card-img` }
                      className={ styles.cardImg }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                      className={ styles.itemName }
                    >
                      {item.strDrink}
                    </p>
                  </div>

                </Link>
              </section>
            ))}
        </div>
      );
    // } if (render && !isLoading && !data.drinks) {
    //   // eslint-disable-next-line no-alert
    //   // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    //   return (
    //     <h2
    //       className={ styles.noDrinksFound }
    //     >
    //       No drinks with this parameter were found.
    //     </h2>
    //   );
    }
    return (
      <div className={ `${styles.drinksCardContainer} animeLeft` }>
        {drinks.drinks && drinks.drinks.filter((_, index) => index < mn)
          .map((item, index) => (
            <Link
              key={ index }
              to={ `/bebidas/${item.idDrink}` }
            >
              <section
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className={ styles.cardDiv }
              >
                <img
                  src={ item.strDrinkThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className={ styles.itemName }
                >
                  {item.strDrink}
                </p>
              </section>
            </Link>
          ))}
      </div>
    );
  }

  function renderByCategories() {
    return (
      <div className={ `${styles.drinksCardContainer} animeLeft` }>
        {drinksByCategories.drinks && drinksByCategories.drinks
          .filter((_, index) => index < mn)
          .map((item, index) => (
            <Link
              to={ `/bebidas/${item.idDrink}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className={ `${styles.cardDiv} animeLeft` }
            >
              <div>
                <img
                  src={ item.strDrinkThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className={ styles.itemName }
                >
                  {item.strDrink}
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
      <Header title="Drinks" glass="true" match={ match } />
      <DrinksCategoriesComponent />
      {toogle ? renderByCategories() : renderDrinks()}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    ingredient: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drinks;
