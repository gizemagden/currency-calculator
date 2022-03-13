import React, { useState, useMemo } from 'react';
import { toPng } from 'html-to-image';

import { useSettingsContext } from '../context';

import Button from "../components/Button";
import ChartData from '../components/charts';
import CurrencyMatcher from '../components/CurrencyMatcher';
import Popover from "../components/Popover";

import DownloadIcon from '../assets/download.svg';
import ArrowIcon from '../assets/arrow.svg';
import { getDailyRates } from '../api';
import { ChartDataTypeArray, ChartTypeEvent, ChartTypePopoverType } from '../types';
import {
  TimeframeButtonType,
  timeFrameTypes,
  TimeframePopoverType,
  ChartTypeButtonType
} from '../types/components';
import "../styles/chart.scss";

const timeFrameMap = {
  30: 'Last 30 Days',
  14: 'Last 2 Weeks',
  7: 'Last Week'
};

const TimeframeButtonRenderer = React.forwardRef<HTMLButtonElement, TimeframeButtonType>(({ timeframe, onClick }, ref) => (
  <Button extraClasses="timeframe" ref={ref} onClick={onClick}>
    <ArrowIcon />
    {timeFrameMap[timeframe as keyof timeFrameTypes]}
  </Button>
));

const TimeframePopover = React.forwardRef<HTMLUListElement, TimeframePopoverType>(({ handleChange }, ref) => (
  <ul className="popoverSelection-list" ref={ref} onClick={(event: ChartTypeEvent) => { handleChange(event.target.id); }}>
    <li id="30">Last 30 Days</li>
    <li id="14">Last 2 Weeks</li>
    <li id="7">Last Week</li>
  </ul>
));

const ChartTypeButtonRenderer = React.forwardRef<HTMLButtonElement, ChartTypeButtonType>(({ chartType, onClick }, ref) => (
  <Button extraClasses="chartType" ref={ref} onClick={onClick}>
    <ArrowIcon />
    {`${chartType} Chart`}
  </Button>
));

const ChartTypePopover = React.forwardRef<HTMLUListElement, ChartTypePopoverType>(({ handleChange }, ref) => (
  <ul className="popoverSelection-list" ref={ref} onClick={(event: ChartTypeEvent) => { handleChange(event.target.id) }}>
    <li id="Bar">Bar Chart</li>
    <li id="Area">Area Chart</li>
  </ul>
));

const Chart = () => {
  const [chartType, setChartType] = useState('Bar');
  const [chartData, setChartData] = useState<ChartDataTypeArray>([]);
  const [timeframe, setTimeframe] = useState('30');
  const [currentChartData, setCurrentChartData] = useState<ChartDataTypeArray>([]);
  // @ts-ignore
  const { state } = useSettingsContext();
  const { settings: { baseCurrency, targetCurrency } } = state;
  const isViewRateButtonDisabled = useMemo(() => {
    return !baseCurrency || !targetCurrency;
  }, [baseCurrency, targetCurrency]);

  const handleChartTypeChange = (value: string) => {
    setChartType(value);
  }

  const handleTimeframeChange = (value: string) => {
    if (value === timeframe) return;
    setTimeframe(value);
    let currentResults = chartData;
    const currentDate = +new Date();
    switch (value) {
      case '7':
        currentResults = chartData.filter(res => {
          const specificDate = +new Date(res.date);
          const diffInMs = currentDate - specificDate;
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          return diffInDays <= 7;
        })
        break;
      case '14':
        currentResults = chartData.filter(res => {
          const specificDate = +new Date(res.date);
          const diffInMs = currentDate - specificDate;
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          return diffInDays <= 14;
        })
        break;
    }
    setCurrentChartData(currentResults);
  }

  const download = () => {
    const node = document.getElementById('rateChart');
    if (node) {
      toPng(node)
        .then((dataUrl: string) => {
          const link = document.createElement('a');
          link.download = 'statistics.png';
          link.href = dataUrl;
          link.click();
        });
    }
  }

  const getChart = async () => {
    const res = await getDailyRates({ from: baseCurrency, to: targetCurrency });
    const d = res.data['Time Series FX (Daily)'];
    const currentDate = +new Date();
    const formmattedResults = Object.keys(d)
      .filter(date => {
        const specificDate = +new Date(date);
        const diffInMs = currentDate - specificDate;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays <= 30;
      })
      .sort((a, b) => {  return new Date(a).getTime() - new Date(b).getTime()})
      .map(elem => ({ date: elem, ...d[elem] }));
    setChartData(formmattedResults);
    setCurrentChartData(formmattedResults);
    setTimeframe('30');
  }
  return (
    <div className='chartTab'>
      <div className='chartTab-line'>
        <CurrencyMatcher />
        <Button
          extraClasses="chartButton"
          onClick={getChart}
          disabled={isViewRateButtonDisabled}
        >
          View Rates
        </Button>
      </div>
      {chartData.length > 0 && (
        <>
          <div className="modal-actions">
            <Button extraClasses="button download" onClick={download}><DownloadIcon />Download</Button>
            <div className='side'>
              <div className='side-elem'>
                <Popover
                  ButtonRenderer={TimeframeButtonRenderer}
                  ButtonContentProps={{ timeframe }}
                  PopoverContentRenderer={TimeframePopover}
                  PopoverContentProps={{
                    handleChange: handleTimeframeChange,
                  }}
                />
              </div>
              <div className='side-elem'>
                <Popover
                  ButtonRenderer={ChartTypeButtonRenderer}
                  ButtonContentProps={{ chartType }}
                  PopoverContentRenderer={ChartTypePopover}
                  PopoverContentProps={{
                    handleChange: handleChartTypeChange,
                  }}
                />
              </div>
            </div>
          </div>
          <ChartData type={chartType} data={currentChartData} />
        </>
      )}
    </div>
  );
}

export default Chart;
