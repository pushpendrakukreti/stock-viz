import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Paper,
} from '@mui/material';
import PriceTypeSelector from '../components/PriceTypeSelector';
import DatePickers from '../components/DatePickers';
import Chart from '../components/Chart';
import { fetchData } from '../service/Api';

const InteractiveChart = ({ selectedStocks, noData }) => {
  const [priceType, setPriceType] = useState('c');
  const [chartData, setChartData] = useState([]);
  const [fromDate, setFromDate] = useState('2023-01-01');
  const [toDate, setToDate] = useState('2023-01-31');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  useEffect(() => {
    fetchData(selectedStocks, fromDate, toDate, priceType)
      .then((mergedData) => {
        if (mergedData.length === 0) {
          setShowNoDataMessage(true);
          setChartData([]);
        } else if (noData) {
          setShowNoDataMessage(true);
          setChartData(mergedData);
        } else {
          setShowNoDataMessage(false);
          setChartData(mergedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching stock prices:', error);
        setShowNoDataMessage(true);
        setChartData([]);
      });
  }, [selectedStocks, priceType, fromDate, toDate]);

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
  };

  const handleClosePopup = () => {
    setShowNoDataMessage(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, my: 2 }}>
        <div>
          <PriceTypeSelector priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
          <DatePickers fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        </div>
      </Paper>
      {chartData.length > 0 ? (
        <Chart chartData={chartData} selectedStocks={selectedStocks} />
      ) : (
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', backdropFilter: 'blur(3px)' }}>
          No Data Available for the Selected Date Range and Stocks
        </Typography>
      )}

      <Dialog open={showNoDataMessage} onClose={handleClosePopup}>
        <DialogTitle>No Data Available</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There is no data available for the selected date range and stocks.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InteractiveChart;
