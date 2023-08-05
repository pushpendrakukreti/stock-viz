import { SelectChangeEvent } from '@mui/material';

export interface Stock {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface PriceTypeSelectorProps {
    priceType: string;
    handlePriceTypeChange: (event: SelectChangeEvent<string>) => void;
}

export interface ChartData {
    date: Date;
    [key: string]: number | Date | null;
}

export interface InteractiveChartProps {
    selectedStocks: string[];
    noData: boolean;
}

export interface ChartProps {
    chartData: ChartData[];
    selectedStocks: string[];
}