import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import useStockData from '../hooks/useStockData';
import StockSelectorAutocomplete from '../components/StockSelectorAutocomplete';
import InteractiveChart from '../components/InteractiveChart';
import MaxSelectionPopup from '../components/MaxSelectionPopup';
import { Stock } from '../types';
import axios from 'axios';

const StockSelector: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock[]>([]);
  const [noData, setNoData] = useState(false);
  const stocks = useStockData();

  const handleStockSelection = async (event: React.ChangeEvent<{}>, value: Stock[]) => {
    const promises = value.map(async (selectedStock) => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/stock/candle', {
          params: {
            symbol: selectedStock.symbol,
            resolution: 'D',
            from: Math.floor(new Date('2023-01-01').getTime() / 1000),
            to: Math.floor(new Date('2023-01-31').getTime() / 1000),
            token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
          },
        });

        if (response.data.s === 'ok') {
          return selectedStock;
        } else {
          return null;
        }
      } catch (error) {
        console.error(`Error fetching data for ${selectedStock.symbol}:`, error);
        return null;
      }
    });

    const validSelectedStocks = await Promise.all(promises);

    const filteredSelectedStocks = validSelectedStocks.filter((selectedStock) => selectedStock !== null) as Stock[];

    if (filteredSelectedStocks.length <= 3) {
      const updatedStocks = value.filter((item) => filteredSelectedStocks.includes(item));
      setSelectedStocks(updatedStocks);
      setSelectedStock(filteredSelectedStocks);
      setShowPopup(false);
      if (value.length !== filteredSelectedStocks.length) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Convert selectedStocks from Stock[] to string[] before passing to InteractiveChart
  const selectedStockSymbols = selectedStocks.map((stock) => stock.displaySymbol);

  return (
    <Container
      className='stock-selector-container'
      maxWidth="lg"
      style={{ marginTop: "1%" }}
      sx={{
        padding: '2%',
      }}
    >
      {/* Autocomplete component */}
      <StockSelectorAutocomplete
        selectedStocks={selectedStocks}
        handleStockSelection={handleStockSelection}
        stocks={stocks}
      />

      {/* Chart component */}
      {selectedStocks.length > 0 ? (
        <InteractiveChart selectedStocks={selectedStockSymbols} noData={noData} />
      ) : (
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', backdropFilter: 'blur(3px)' }}>
          Select up to 3 stocks from the dropdown to view the chart.
        </Typography>
      )}

      {/* Popup message for selecting more than 3 stocks */}
      <MaxSelectionPopup
        showPopup={showPopup}
        handleClosePopup={handleClosePopup}
      />
    </Container>
  );
};

export default StockSelector;
