import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
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

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff0000', '#00ff00', '#0000ff']; // Define custom colors for the lines

const InteractiveChart = ({ selectedStocks }) => {
    const [priceType, setPriceType] = useState('c');
    const [chartData, setChartData] = useState([]);
    const [fromDate, setFromDate] = useState('2023-01-01');
    const [toDate, setToDate] = useState('2023-01-31');
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    useEffect(() => {
        fetchData();
    }, [selectedStocks, priceType, fromDate, toDate]);

    const fetchData = async () => {
        try {
            const promises = selectedStocks.map(async (selectedStock) => {
                const response = await axios.get('https://finnhub.io/api/v1/stock/candle', {
                    params: {
                        symbol: selectedStock,
                        resolution: 'D',
                        from: Math.floor(new Date(fromDate).getTime() / 1000),
                        to: Math.floor(new Date(toDate).getTime() / 1000),
                        token: "civgs1pr01qu45tmh950civgs1pr01qu45tmh95g",
                    },
                });
                if (response.data.s === "ok") {
                    return parseChartData(response.data, selectedStock);
                }
                else {
                    setShowNoDataMessage(true)
                }
            });

            const data = await Promise.all(promises);

            const mergedData = mergeChartData(data);

            if (mergedData.length === 0) {
                setShowNoDataMessage(true);
                setChartData([]);
            } else {
                setShowNoDataMessage(false);
                setChartData(mergedData);
            }
        } catch (error) {
            console.error('Error fetching stock prices:', error);
        }
    };

    const parseChartData = (data, selectedStock) => {
        if (!data.c) {
            return [];
        }

        const parsedData = [];

        for (let i = 0; i < data.t.length; i++) {
            const date = new Date(data.t[i] * 1000);
            const price = priceType === 'o' ? data.o[i]
                : priceType === 'h' ? data.h[i]
                    : priceType === 'l' ? data.l[i]
                        : data.c[i];

            parsedData.push({
                date,
                [selectedStock]: price,
            });
        }

        return parsedData;
    };

    const mergeChartData = (data) => {
        if (data.length === 0) {
            return [];
        }

        const mergedData = [];

        // Create a set of unique dates across all datasets
        const dateSet = new Set();
        data.forEach((dataset) => {
            dataset.forEach((dataEntry) => {
                dateSet.add(dataEntry.date.toISOString());
            });
        });

        // Sort the dates in ascending order
        const sortedDates = [...dateSet].sort();

        // Create a new object for each date with the corresponding values from each dataset
        sortedDates.forEach((date) => {
            const dateObj = { date: new Date(date) };
            data.forEach((dataset) => {
                const entry = dataset.find((dataEntry) => dataEntry.date.toISOString() === date);
                dateObj[entry ? Object.keys(entry)[1] : selectedStocks[0]] = entry ? entry[Object.keys(entry)[1]] : null;
            });
            mergedData.push(dateObj);
        });

        return mergedData;
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
                </div>
            </Paper>
            {chartData.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} className='main-chart' style={{ width: '84vw', background: 'rgb(255,255,255)', zoom: 0.9, padding: '2% 1% 1% 0%', marginLeft: '-3%', borderRadius: '5px' }}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[-10, 'auto']} />
                            {selectedStocks.map((selectedStock, index) => (
                                <Line
                                    key={selectedStock}
                                    type="monotone"
                                    dataKey={selectedStock}
                                    stroke={colors[index % colors.length]}
                                    strokeWidth={3}
                                />
                            ))}
                            <Tooltip
                                labelFormatter={(value) => {
                                    const date = new Date(value);
                                    return `${date.toDateString()}`;
                                }}
                                formatter={(value, name) => [`${value}`, `${name}`]}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </>
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
