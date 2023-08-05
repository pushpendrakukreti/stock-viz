import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PriceTypeSelectorProps } from '../../types';


const PriceTypeSelector: React.FC<PriceTypeSelectorProps> = ({ priceType, handlePriceTypeChange }): JSX.Element => {
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="price-type-selector">Price Type</InputLabel>
      <Select
        label="Price Type"
        id="price-type-selector"
        value={priceType}
        onChange={handlePriceTypeChange}
      >
        <MenuItem value="c">Closing Price</MenuItem>
        <MenuItem value="o">Opening Price</MenuItem>
        <MenuItem value="h">High Price</MenuItem>
        <MenuItem value="l">Low Price</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PriceTypeSelector;
