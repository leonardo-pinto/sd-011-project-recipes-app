import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { SearchBarProvider } from '../context/SearchBar';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <SearchBarProvider>
        <Router history={ history }>{ component }</Router>
      </SearchBarProvider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
