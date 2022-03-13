import React, { useState, useMemo, useEffect } from 'react';

import { useSettingsContext } from '../context';
import { updateSettings } from '../context/ActionCreators';

import Button from '../components/Button';
import CurrencyMatcher from '../components/CurrencyMatcher';

import { getExchangeRate } from "../api";

const Convert = () => {
  // @ts-ignore
  const { state, dispatch } = useSettingsContext();
  const { settings: { baseCurrency, targetCurrency, amount } } = state;
  const [result, setResult] = useState<number | null>(null);
  const isConvertButtonDisabed = useMemo(() => {
    return !baseCurrency || !targetCurrency;
  }, [baseCurrency, targetCurrency]);
  
  useEffect(() => {
    setResult(null);
  }, [baseCurrency, targetCurrency, amount]);

  const handleAmountChange = (val: string) => {
    dispatch(updateSettings({ amount: val }));
  }
  const convert = async () => {
    const test = await getExchangeRate({ from: baseCurrency, to: targetCurrency });
    const res = test * parseInt(amount);
    setResult(res);
  }
  return (
    <div className="convertWrapper">
      <div className="convert">
        <div className="convert-amount">
          <h5>Amount</h5>
          <input value={amount} type="number" onChange={(e) => { handleAmountChange(e.target.value) }} />
        </div>
        <CurrencyMatcher />
      </div>
      <div className='convert-footer'>
        <Button
          extraClasses="convertMe"
          disabled={isConvertButtonDisabed}
          onClick={convert}
        >
          Convert
        </Button>
        {result && (
          <div className='convert-results'>
            <span>{`${amount} ${baseCurrency}`}</span>
            <b>
              <span>{` = ${result} ${targetCurrency}`}</span>
            </b>
          </div>
        )}
      </div>
    </div>
  );
}

export default Convert;
