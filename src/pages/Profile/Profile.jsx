import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './Profile.module.css';

function Profile({ match }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (emailLocalStorage) {
      setEmail(emailLocalStorage.email);
    }
  }, []);
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header title="Profile" match={ match } />
      <div className={ `${styles.container} animeLeft` }>
        <span data-testid="profile-email">{ email }</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logOut() }
        >
          Logout
        </button>
      </div>
      <Footer />
    </main>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Profile;
