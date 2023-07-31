import React from 'react';
import { TextField } from '@mui/material';

const DatePickers = ({ fromDate, toDate, setFromDate, setToDate }) => {
  return (
    <>
      <TextField
        label="From Date"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        sx={{ mx: 2 }}
        style={{ background: 'rgba(255,255,255)' }}
      />
      <TextField
        label="To Date"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        sx={{ mx: 2 }}
        style={{ background: 'rgba(255,255,255)' }}
      />
    </>
  );
};

export default DatePickers;
