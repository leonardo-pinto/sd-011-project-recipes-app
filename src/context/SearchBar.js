import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

export function SearchBarProvider({ children }) {
  const [data, setData] = useState({});
  const [shouldCallCards, setShouldCallCards] = useState(false);
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');
  const [recipeId, setRecipeId] = useState();
  const [dataValues, setDataValues] = useState();
  const [path, setPath] = useState();
  const [recipeType, setRecipeType] = useState();
  const [newSearch, setNewSearch] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  // Jorge
  const [ingred, setIngred] = useState('');

  const value = {
    input,
    setInput,
    radio,
    setRadio,
    recipeId,
    setRecipeId,
    dataValues,
    setDataValues,
    path,
    setPath,
    recipeType,
    setRecipeType,
    newSearch,
    setNewSearch,
    data,
    setData,
    shouldCallCards,
    setShouldCallCards,
    categories,
    setCategories,
    filter,
    setFilter,
    dataList,
    setDataList,
    ingred,
    setIngred,
  };
  return (
    <SearchBarContext.Provider value={ value }>
      { children }
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

// import { SearchBarProvider } from '../../context/SearchBar';

// function Foods() {
//   return (
//     <div>
//       <SearchBarProvider>
//         <SearchBar />
//       </SearchBarProvider>
//     </div>
//   );
// }

// Dentro do Componente
// const { setData } = useContext(SearchBarContext)
