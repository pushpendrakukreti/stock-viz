import React from 'react';
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
import { ChartData, ChartProps } from '../types';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff0000', '#00ff00', '#0000ff'];

function formatDateToMMDDYY(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${month}-${day}-${year}`;
}

const Chart: React.FC<ChartProps> = ({ chartData, selectedStocks }): JSX.Element => {
  const tickInterval = Math.floor((chartData.length - 1) / 7);

  return (
    <ResponsiveContainer height={400}>
      <LineChart
        data={chartData}
        className="main-chart"
        style={{
          width: 'inherit',
          background: 'rgb(255,255,255)',
          zoom: 0.9,
          padding: '2% 4% 1% 0%',
          borderRadius: '5px',
          marginLeft: '-2%',
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" tickFormatter={formatDateToMMDDYY} interval={tickInterval} />
        <YAxis />
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
        <Legend verticalAlign="bottom" height={36} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
