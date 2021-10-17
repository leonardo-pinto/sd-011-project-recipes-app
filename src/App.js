import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';
import ComidaProcesso from './Pages/ComidaProcesso';
import BebidaProcesso from './Pages/BebidaProcesso';
import Explorar from './Pages/Explorar';
import ExplorarComidas from './Pages/ExplorarComidas';
import ExplorarBebidas from './Pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './Pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './Pages/ExplorarBebidasIngredientes';
import ExplorarComidasOrigem from './Pages/ExplorarComidasOrigem';
import Perfil from './Pages/Perfil';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';
import NotFound from './Pages/NotFound';
import Details from './Pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas"
        render={ (props) => <Comidas title="Comidas" { ...props } /> }
      />
      <Route
        exact
        path="/bebidas"
        render={ (props) => <Bebidas title="Bebidas" { ...props } /> }
      />
      <Route exact path="/comidas/:id" component={ Details } />
      <Route exact path="/bebidas/:id" component={ Details } />
      <Route exact path="/comidas/:id/in-progress" component={ ComidaProcesso } />
      <Route exact path="/bebidas/:id/in-progress" component={ BebidaProcesso } />
      <Route exact path="/explorar" render={ () => <Explorar title="Explorar" /> } />
      <Route
        exact
        path="/explorar/comidas"
        render={ () => <ExplorarComidas title="Explorar Comidas" /> }
      />
      <Route
        exact
        path="/explorar/bebidas"
        render={ () => <ExplorarBebidas title="Explorar Bebidas" /> }
      />
      <Route
        path="/explorar/comidas/ingredientes"
        render={ () => <ExplorarComidasIngredientes title="Explorar Ingredientes" /> }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        render={ () => <ExplorarBebidasIngredientes title="Explorar Ingredientes" /> }
      />
      <Route
        path="/explorar/comidas/area"
        render={ () => <ExplorarComidasOrigem title="Explorar Origem" /> }
      />
      <Route path="/perfil" render={ () => <Perfil title="Perfil" /> } />
      <Route
        path="/receitas-feitas"
        render={ () => <ReceitasFeitas title="Receitas Feitas" /> }
      />
      <Route
        path="/receitas-favoritas"
        render={ () => <ReceitasFavoritas title="Receitas Favoritas" /> }
      />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
