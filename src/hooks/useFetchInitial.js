import { useState, useEffect } from 'react';

const useFetchInitial = (urlFoods, urlDrinks) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseFoods = await fetch(urlFoods);
        const responseDrinks = await fetch(urlDrinks);
        const resultFoods = await responseFoods.json();
        const resultDrinks = await responseDrinks.json();
        setData({ ...resultFoods, ...resultDrinks });
      } catch (e) {
        setData([]);
        setError(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [urlFoods, urlDrinks]);
  return { data, error, isLoading };
};

export default useFetchInitial;
