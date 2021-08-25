import React from 'react';
import DrinkDetailCard from '../../components/DrinkDetailCard';

export default function DrinkRecipes() {
  return (
    <div>
      <div className="container-header-filters" style={ { display: 'flex', padding: 0 } }>
        <h3 className="container-header">
          Detalhes da bebida
        </h3>
      </div>
      <div style={ { marginTop: '10px' } }>
        <DrinkDetailCard />
      </div>
    </div>
  );
}
