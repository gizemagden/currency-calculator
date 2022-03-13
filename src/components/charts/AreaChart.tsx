import React from 'react';
import {
  AreaChart as Chart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { ChartDataType } from '../../types';
const AreaChart = ({
  data
}: ChartDataType) => (
  <div className="rateChart" id="rateChart">
    <ResponsiveContainer width="100%" height={300}>
      <Chart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f08011" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f08011" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b56e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b56e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e834eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e834eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="1. open" stroke="#f08011" fillOpacity={1} fill="url(#color1)" />
        <Area type="monotone" dataKey="2. high" stroke="#10b56e" fillOpacity={1} fill="url(#color2)" />
        <Area type="monotone" dataKey="3. low" stroke="#82ca9d" fillOpacity={1} fill="url(#color3)" />
        <Area type="monotone" dataKey="4. close" stroke="#e834eb" fillOpacity={1} fill="url(#color4)" />
      </Chart>
    </ResponsiveContainer>
  </div>
)

export default AreaChart;
