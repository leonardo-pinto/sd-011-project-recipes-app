import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/foods/Foods';
import FoodExplorer from './pages/foods/FoodExplorer';
import FoodExplorerByIngredients from './pages/foods/FoodExplorerByIngredients';
import FoodExplorerByCountry from './pages/foods/FoodExplorerByCountry';
import FoodRecipes from './pages/foods/FoodRecipes';
import Drinks from './pages/drinks/Drinks';
import DrinkExplorer from './pages/drinks/DrinkExplorer';
import DrinkExplorerByIngredients from './pages/drinks/DrinkExplorerByIngredients';
import DrinkRecipes from './pages/drinks/DrinkRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explorer from './pages/Explorer';
import NotFound from './pages/NotFound';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const pathFoods = '/explorar/comidas/ingredientes';
  const pathDrinks = '/explorar/bebidas/ingredientes';

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/comidas" component={ FoodExplorer } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplorer } />
      <Route exact path={ pathFoods } component={ FoodExplorerByIngredients } />
      <Route exact path={ pathDrinks } component={ DrinkExplorerByIngredients } />
      <Route exact path="/explorar/comidas/area" component={ FoodExplorerByCountry } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ FoodRecipes } />
      <Route exact path="/bebidas/:id" component={ DrinkRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
