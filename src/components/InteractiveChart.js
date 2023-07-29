import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';

const InteractiveChart = ({ selectedStock }) => {
    const [priceType, setPriceType] = useState('c'); // 'c' for close prices by default
    const [chartData, setChartData] = useState([]);
    const [fromDate, setFromDate] = useState('2023-01-01');
    const [toDate, setToDate] = useState('2023-01-31');
    const [showNoDataMessage, setShowNoDataMessage] = useState(false); // State to control the popup message

    useEffect(() => {
        fetchData();
    }, [selectedStock, priceType, fromDate, toDate]);

    const fetchData = async () => {
        try {
            // Fetch data for the selected stock
            const response = await axios.get('https://finnhub.io/api/v1/stock/candle', {
                params: {
                    symbol: selectedStock,
                    resolution: 'D', // Daily resolution
                    from: Math.floor(new Date(fromDate).getTime() / 1000),
                    to: Math.floor(new Date(toDate).getTime() / 1000),
                    token: "civgs1pr01qu45tmh950civgs1pr01qu45tmh95g",
                },
            });

            const data = await parseChartData(response.data);

            if (data.length === 0) {
                // Show popup message if there is no data available for the selected date range
                setShowNoDataMessage(true);
                setChartData([]);
            } else {
                setShowNoDataMessage(false);
                setChartData(data);
            }
        } catch (error) {
            console.error('Error fetching stock prices:', error);
        }
    };

    const parseChartData = (data) => {
        if (!data.c) {
            return [];
        }

        const parsedData = [];

        for (let i = 0; i < data.t.length; i++) {
            const date = new Date(data.t[i] * 1000); // Convert Unix timestamp to JavaScript Date object
            parsedData.push({
                date,
                open: data.o[i],
                high: data.h[i],
                low: data.l[i],
                close: data.c[i],
            });
        }

        return parsedData;
    };

    const handlePriceTypeChange = (event) => {
        setPriceType(event.target.value);
    };

    const handleFetchData = () => {
        fetchData();
    };

    const handleClosePopup = () => {
        setShowNoDataMessage(false);
    };

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 4, my: 2 }}>
                <div>
                    <FormControl sx={{ minWidth: 120, mx: 2 }} style={{ background: 'rgba(255,255,255)' }}>
                        <InputLabel>
                            <span style={{ background: "rgba(255,255,255,1)" }}>Price Type</span>
                        </InputLabel>
                        <Select value={priceType} onChange={handlePriceTypeChange}>
                            <MenuItem value="o">Open Prices</MenuItem>
                            <MenuItem value="h">High Prices</MenuItem>
                            <MenuItem value="l">Low Prices</MenuItem>
                            <MenuItem value="c">Close Prices</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Button variant="contained" onClick={handleFetchData} sx={{ ml: 2 }} style={{ padding: '1.1em' }}>
                        Fetch Data
                    </Button>
                </div>
            </Paper>
            {chartData.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} className='main-chart' style={{ background: 'rgb(255,255,255)', zoom: 0.9, padding: '2% 4% 1% 0%', marginLeft: '3%', borderRadius: '5px' }}>
                            <Line type="monotone" dataKey="open" stroke="#8884d8" />
                            <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="low" stroke="#ffc658" />
                            <Line type="monotone" dataKey="close" stroke="#ff0000" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', backdropFilter: 'blur(3px)' }}>
                    No Data Available for the Selected Date Range and Stock
                </Typography>
            )}

            {/* Popup message for no data */}
            <Dialog open={showNoDataMessage} onClose={handleClosePopup}>
                <DialogTitle>No Data Available</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        There is no data available for the selected date range and stock.
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