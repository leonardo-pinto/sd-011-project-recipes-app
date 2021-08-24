import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './Explore.module.css';

function Explore({ match }) {
  const history = useHistory();
  return (
    <section>
      <Header title="Explore" match={ match } />
      <div className={ `${styles.container} animeLeft` }>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </section>
  );
}

Explore.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Explore;
