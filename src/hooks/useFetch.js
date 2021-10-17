import { useState, useEffect } from 'react';

const useFetch = (url, input = '') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(url.concat(input));
        const result = await resp.json();
        setData(result);
      } catch (e) {
        setData([]);
        setError(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, input]);
  return { data, error, isLoading };
};

export default useFetch;
