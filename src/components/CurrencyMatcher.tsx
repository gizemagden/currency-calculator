import React from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import Arrows from "../assets/arrows.svg";
import { valuePropType } from '../types';

import { useSettingsContext } from '../context';
import { updateSettings } from '../context/ActionCreators';

const CurrencyMatcher = () => {
  // @ts-ignore
  const { dispatch, state } = useSettingsContext();
  const { settings: { baseCurrency, targetCurrency } } = state;
  const swapCurrencySelections = () => {
    dispatch(updateSettings({ targetCurrency: baseCurrency, baseCurrency: targetCurrency }));
  }

  const handleBaseDropdown = ({ value }: valuePropType) => {
    dispatch(updateSettings({ baseCurrency: value }));
  }
  const handleTargetDropdown = ({ value }: valuePropType) => {
    dispatch(updateSettings({ targetCurrency: value }));
  }

  return (
    <div className="convert-matcher">
      <div className="convert-matcher-source-from">
        <h5>From</h5>
        <CurrencyDropdown
          value={baseCurrency}
          onChange={handleBaseDropdown}
        />
      </div>
      <div className="convert-matcher-arrows">
        <Arrows onClick={swapCurrencySelections}/>
      </div>
      <div className="convert-matcher-to">
        <h5>To</h5>
        <CurrencyDropdown
          value={targetCurrency}
          onChange={handleTargetDropdown}
        />
      </div>
    </div>
  );
}
export default CurrencyMatcher;
