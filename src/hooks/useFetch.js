import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      //  setIsLoading(true);
      try {
        const resp = await fetch(url, options);
        const result = await resp.json();
        setData(result);
      } catch (e) {
        setData([]);
        // setError(e);
      }
      // setIsLoading(false);
    };

    fetchData();
  }, [url, options]);
  return { data }; // error, isLoading
};

export default useFetch;
