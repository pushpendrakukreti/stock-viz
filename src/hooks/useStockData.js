import { useState, useEffect } from 'react';
import axios from 'axios';

const useStockData = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/stock/symbol', {
          params: {
            exchange: 'US',
            token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
          },
        });

        // const ffData = response.data.filter((elem) => elem.type === "NY Reg Shrs");
        const fData = response.data.slice(0, 9);
        setStocks(fData);
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchStocks();
  }, []);

  return stocks;
};

export default useStockData;
