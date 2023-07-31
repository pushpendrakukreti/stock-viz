import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Autocomplete,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import InteractiveChart from './InteractiveChart';
import ClearIcon from '@mui/icons-material/Clear';

const StockSelector = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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

            let unique_values = response.data
                .map((item) => item.type)
                .filter(
                    (value, index, current_value) => current_value.indexOf(value) === index
                );

            const ffData = response.data.filter((elem) => elem.type === "NY Reg Shrs");
            const fData = ffData.slice(0, 9);

            setTimeout(() => {
                setStocks(fData);
            }, 1000);
        } catch (error) {
            console.error('Error fetching stock symbols:', error);
        }
    };

    const handleStockSelection = (event, value) => {
        if (value.length <= 3) {
            let selectedStocks = value.slice(0, 3); // Limit the selected stocks to a maximum of 3
            let selectedSymbols = selectedStocks.map((stock) => stock.displaySymbol);
            setSelectedStocks(selectedStocks);
            setSelectedStock(selectedSymbols);
            setShowPopup(false); // Hide the popup if the selection is valid
        } else {
            setShowPopup(true); // Show the popup if more than 3 stocks are selected
        }
    };

    const handleClearSelection = () => {
        setSelectedStocks([]);
    };

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
        <Container
            className='stock-selector-container'
            maxWidth="lg"
            style={{ marginTop: "1%" }}
            sx={{
                padding: '2%',
            }}
        >
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
            {selectedStock.length > 0 ? (
                <InteractiveChart selectedStocks={selectedStock} />
            ) : (
                <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', backdropFilter: 'blur(3px)' }}>
                    Select up to 3 stocks from the dropdown to view the chart.
                </Typography>
            )}

            {/* Popup message for selecting more than 3 stocks */}
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogTitle>Maximum Selection Limit Reached</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can select up to 3 stocks from the dropdown.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(false)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default StockSelector;
