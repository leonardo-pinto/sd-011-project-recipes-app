import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Explorar extends Component {
  render() {
    const title = 'Explorar';
    const lupa = 'desligado';
    return (
      <main>
        Explorar
        <Header
          title={ title }
          lupa={ lupa }
        />
        <Footer />
      </main>
    );
  }
}

export default Explorar;
