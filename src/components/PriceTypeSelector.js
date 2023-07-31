import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const PriceTypeSelector = ({ priceType, handlePriceTypeChange }) => {
  return (
    <FormControl sx={{ minWidth: 120, mx: 2 }} style={{ background: 'rgba(255,255,255)' }}>
      <InputLabel>
        <span style={{ background: 'rgba(255,255,255,1)' }}>Price Type</span>
      </InputLabel>
      <Select value={priceType} onChange={handlePriceTypeChange}>
        <MenuItem value="o">Open Prices</MenuItem>
        <MenuItem value="h">High Prices</MenuItem>
        <MenuItem value="l">Low Prices</MenuItem>
        <MenuItem value="c">Close Prices</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PriceTypeSelector;
