import React from 'react';
import Provider from './Context/Provider';
import MainRouter from './Router/MainRouter';

function App() {
  return (
    <Provider>
      <div className="meals">
        <MainRouter />
      </div>
    </Provider>
  );
}

export default App;
