import React from 'react';
import {
  BarChart as Chart,
  Bar,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { ChartDataType } from '../../types';

const BarChart = ({
  data
}: ChartDataType) => (
  <div className="rateChart" id="rateChart">
    <ResponsiveContainer width="100%" height={300}>
      <Chart width={2000} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickCount={10}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="1. open" fill="#5603AD" />
        <Bar dataKey="2. high" fill="#12b5a6" />
        <Bar dataKey="3. low" fill="#f02011" />
        <Bar dataKey="4. close" fill="#e5fc12" />
      </Chart>
    </ResponsiveContainer>
  </div>
)

export default BarChart;
