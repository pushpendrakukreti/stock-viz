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

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff0000', '#00ff00', '#0000ff'];

const Chart = ({ chartData, selectedStocks }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        className='main-chart'
        style={{ width: '84vw', background: 'rgb(255,255,255)', zoom: 0.9, padding: '2% 1% 1% 0%', marginLeft: '-3%', borderRadius: '5px' }}
      >
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
  );
};

export default Chart;
