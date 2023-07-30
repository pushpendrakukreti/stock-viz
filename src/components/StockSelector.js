import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import InteractiveChart from './InteractiveChart';

const StockSelector = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await axios.get('https://finnhub.io/api/v1/stock/symbol', {
                params: {
                    exchange: 'US',
                    token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
                },
            });

            const ffData = response.data.filter((elem) => elem.displaySymbol === "AAPL");
            const fData = response.data.slice(0, 9);
            setTimeout(() => {
                setStocks([...ffData, ...fData]);
            }, 1000);
        } catch (error) {
            console.error('Error fetching stock symbols:', error);
        }
    };

    const handleStockSelection = (event) => {
        const selectedOptions = event.target.value;
        if (selectedOptions.length > 3) {
            setSelectedStocks(selectedOptions.slice(0, 3));
        } else {
            setSelectedStocks(selectedOptions);
        }
    };

    return (
        <Container
            className='stock-selector-container'
            maxWidth="lg"
            style={{ marginTop: "1%" }}
            sx={{
                padding: '2%',
            }}
        >
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel className='stock-selector-label'>
                    Select Stocks (Max 3)
                </InputLabel>
                <Select
                    className='stock-selector-dropdown'
                    multiple
                    value={selectedStocks}
                    onChange={handleStockSelection}
                >
                    {stocks.map((stock) => (
                        <MenuItem key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - {stock.description}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedStocks.length > 0 ? (
                <InteractiveChart selectedStocks={selectedStocks} />
            ) : (
                <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', backdropFilter: 'blur(3px)' }}>
                    Select up to 3 stocks from the dropdown to view the chart.
                </Typography>
            )}
        </Container>
    );
};

export default StockSelector;
