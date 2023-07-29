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
    const [selectedStock, setSelectedStock] = useState('');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    // Fetch stock symbols from the API
    const fetchStocks = async () => {
        try {
            const response = await axios.get('https://finnhub.io/api/v1/stock/symbol', {
                params: {
                    exchange: 'US', // Fetch symbols for the US Stock Exchange
                    token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
                },
            });

            const ffData = response.data.filter((elem) => elem.displaySymbol == "AAPL");
            const fData = response.data.slice(0, 9);
            setStocks([...ffData, ...fData]);
        } catch (error) {
            console.error('Error fetching stock symbols:', error);
        }
    };

    const handleStockSelection = (event) => {
        setSelectedStock(event.target.value);
    };

    return (
        <Container
            className='stock-selector-container'
            maxWidth="lg"
            style={{ marginTop: "1%" }}
            sx={{
                padding: '2%',
                // borderRadius: '10pt'
            }}>
            {/* <Typography variant="h4">Select a Stock</Typography> */}
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel className='stock-selector-label'>
                    Select a Stock
                </InputLabel>
                <Select
                    className='stock-selector-dropdown'
                    value={selectedStock}
                    onChange={handleStockSelection}
                >
                    {stocks.map((stock) => (
                        <MenuItem key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - {stock.description}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedStock && <InteractiveChart selectedStock={selectedStock} />}
        </Container>
    );
};

export default StockSelector;