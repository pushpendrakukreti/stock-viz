import React from 'react';
import { TextField } from '@mui/material';

interface DatePickersProps {
  fromDate: string;
  toDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
}

const DatePickers: React.FC<DatePickersProps> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}): JSX.Element => {
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
