import React from 'react';
import '../App.css';
import logo from '../images/cozinheiro.gif';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Components/Login';
import '../css/Home.css';

function Home() {
  return (
    <div className="meals">
      <h1 className="title-home">Recipes App Store</h1>
      <h3>Welcome back!</h3>
      <img src={ logo } alt="Logo app" width="150px" />
      <Login />
    </div>
  );
}

export default Home;
