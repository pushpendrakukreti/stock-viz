# STOCK-VIZ: Interactive Stock Price Chart Application

## Overview

This is a single-page React.js application that enables users to select stocks from the US Stock Exchange and visualize their time series of prices on an interactive chart. The app fetches stock symbols from the Finnhub API and presents them in a dropdown menu. Users can select up to three stocks and specify a date range to chart the prices.

## Features

- **Stock Selection:** Choose stocks from the US Stock Exchange using the dropdown menu.
- **Date Range:** Set a date range to view the time series of prices for the selected stocks.
- **Price Type Toggle:** Switch between open, high, low, and close prices in the interactive chart.
- **Interactive Chart:** Powered by React Charts (Recharts) for smooth data visualization.
- **Visual Appeal:** The app features a glass-like background for an engaging user interface.
- **No Data Message:** Displays a popup message when no data is available for the selected stock and date range.

## How to Use

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Run the application using `npm start`.
4. Upon opening the app, you will see a dropdown menu to select a stock.
5. Choose stock from the dropdown and set the desired date range.
6. The interactive chart will display the time series of prices for the selected stocks based on the specified date range.

## Technologies Used

- JavaScript
- React.js
- Material-UI for user interface components
- Recharts for interactive data visualization
- Axios for API data fetching

## API Used

- Finnhub API (https://finnhub.io/)

Please note that the application fetches data from the Finnhub API, and the stock symbols available are limited to the US Stock Exchange. Enjoy exploring stock price trends with this interactive chart application!

For detailed information on the API endpoints and chart options, refer to the application's code and the provided comments.