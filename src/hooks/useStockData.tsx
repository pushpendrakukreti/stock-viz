import { useState, useEffect } from 'react';
import axios from 'axios';

interface Stock {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

const useStockData = (): Stock[] => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/stock/symbol', {
          params: {
            exchange: 'US',
            token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
          },
        });

        const ffData = response.data.filter((elem: Stock) => elem.type === 'NY Reg Shrs');
        setStocks(ffData);
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchStocks();
  }, []);

  return stocks;
};

export default useStockData;
