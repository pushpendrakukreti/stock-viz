import axios from 'axios';
import { ChartData } from '../types';

const fetchData = async (
    selectedStocks: string[],
    fromDate: string,
    toDate: string,
    priceType: string
): Promise<ChartData[]> => {
    try {
        const promises = selectedStocks.map(async (selectedStock) => {
            const response = await axios.get('https://finnhub.io/api/v1/stock/candle', {
                params: {
                    symbol: selectedStock,
                    resolution: 'D',
                    from: Math.floor(new Date(fromDate).getTime() / 1000),
                    to: Math.floor(new Date(toDate).getTime() / 1000),
                    token: 'civgs1pr01qu45tmh950civgs1pr01qu45tmh95g',
                },
            });
            if (response.data.s === 'ok') {
                return parseChartData(response.data, selectedStock, priceType);
            } else {
                return null;
            }
        });

        const data = await Promise.all(promises);

        const validData = data.filter((item) => item !== null) as ChartData[][];

        const mergedData = mergeChartData(validData, selectedStocks);

        return mergedData;
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        return [];
    }
};

const parseChartData = (data: any, selectedStock: string, priceType: string): ChartData[] => {
    if (!data.c) {
        return [];
    }

    const parsedData: ChartData[] = [];

    for (let i = 0; i < data.t.length; i++) {
        const date = new Date(data.t[i] * 1000);
        const price = priceType === 'o' ? data.o[i] : priceType === 'h' ? data.h[i] : priceType === 'l' ? data.l[i] : data.c[i];

        parsedData.push({
            date,
            [selectedStock]: price,
        });
    }

    return parsedData;
};

const mergeChartData = (data: ChartData[][], selectedStocks: string[]): ChartData[] => {
    if (data.length === 0) {
        return [];
    }

    const dateSet: Set<string> = new Set();
    data.forEach((dataset) => {
        dataset.forEach((dataEntry) => {
            dateSet.add(dataEntry.date.toISOString()); // Convert date to string before adding to the Set
        });
    });

    const sortedDates = Array.from(dateSet).sort(); // Convert the Set to an array

    const mergedData: ChartData[] = [];

    sortedDates.forEach((date) => {
        const dateObj: ChartData = { date: new Date(date) };
        data.forEach((dataset) => {
            const entry = dataset.find((dataEntry) => dataEntry.date.toISOString() === date);
            dateObj[entry ? Object.keys(entry)[1] : selectedStocks[0]] = entry ? entry[Object.keys(entry)[1]] : null;
        });
        mergedData.push(dateObj);
    });

    return mergedData;
};

export { fetchData };
