import React from "react";
import AreaChart from "./AreaChart"; // It does not show the results in a differentiated way.
import BarChart from "./BarChart";
import { ChartType, chartMappingType } from '../../types/components';

const Chart = ({ type, data }: ChartType) => {
  const chartMapping: chartMappingType = {
    'Area': AreaChart,
    'Bar': BarChart
  };
  const Wizard = chartMapping[type];
  return (
    <Wizard data={data} />
  );
}

export default Chart;
