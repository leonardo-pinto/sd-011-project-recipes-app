import React from 'react';
import MealDetailCard from '../../components/MealDetailCard';
import '../../App.css';

export default function FoodRecipes() {
  return (
    <div>
      <div className="container-header-filters" style={ { display: 'flex', padding: 0 } }>
        <h3 className="container-header">
          Detalhes da comida
        </h3>
      </div>
      <div style={ { marginTop: '10px' } }>
        <MealDetailCard />
      </div>
    </div>
  );
}
