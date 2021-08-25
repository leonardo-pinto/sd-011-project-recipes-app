import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SearchBarProvider } from './context/SearchBar';
// import { SearchBarProvider } from './context/SearchBar';

ReactDOM.render(
  <BrowserRouter>
    <SearchBarProvider>
      <App />
    </SearchBarProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
