import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const StockSelectorAutocomplete = ({ selectedStocks, handleStockSelection, stocks }) => {
  const getDropdownLabel = () => {
    if (selectedStocks.length === 0) {
      return 'Select Stocks (Max 3)';
    } else if (selectedStocks.length === 1) {
      return `${selectedStocks[0].symbol} - ${selectedStocks[0].description}`;
    } else {
      const firstStock = selectedStocks[0].symbol;
      const otherStocksCount = selectedStocks.length - 1;
      return `${firstStock} + ${otherStocksCount} others`;
    }
  };

  return (
    <Autocomplete
      multiple
      id="stock-selector-dropdown"
      value={selectedStocks}
      onChange={handleStockSelection}
      options={stocks}
      getOptionLabel={(option) => option.symbol + ' - ' + option.description}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={getDropdownLabel()}
        />
      )}
    />
  );
};

export default StockSelectorAutocomplete;
