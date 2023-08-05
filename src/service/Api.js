import axios from 'axios';

const fetchData = async (selectedStocks, fromDate, toDate, priceType) => {
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
                return parseChartData(response.data, selectedStock, priceType);
            } else {
                return null;
            }
        });

        const data = await Promise.all(promises);

        const mergedData = mergeChartData(data, selectedStocks);

        return mergedData;
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        return [];
    }
};

const parseChartData = (data, selectedStock, priceType) => {
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

const mergeChartData = (data, selectedStocks) => {
    if (data.length === 0) {
        return [];
    }

    const mergedData = [];

    const dateSet = new Set();
    data.forEach((dataset) => {
        dataset.forEach((dataEntry) => {
            dateSet.add(dataEntry.date.toISOString());
        });
    });

    const sortedDates = [...dateSet].sort();

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

export { fetchData };
