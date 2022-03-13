import React, { useMemo } from 'react';
import Select, { components } from 'react-select';
import currencies from '../constants/currencies.json';
import CurrencyFlag from 'react-currency-flags';
import "../styles/dropdown.scss";
import { DropdownProps } from '../types/components';

const CurrencyFlagComponent = ({ code = '', extraClasses = '' }) => (
  <CurrencyFlag className={`currencyFlag ${extraClasses}`} currency={code} width={36} />
);

const Control = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <components.Control {...props}>
    {props?.selectProps?.value?.value && <CurrencyFlagComponent extraClasses="withMargin" code={props?.selectProps?.value?.value} />}
    {children}
  </components.Control>
);

const { Option } = components;
const IconOption = (props: any) => (
  <Option {...props}>
    <CurrencyFlagComponent code={props?.data?.value} />
    {props.data.label}
  </Option>
);

const CurrencyDropdown = ({ value, onChange }: DropdownProps) => {
  const currencyOptions = useMemo(() => {
    return currencies.map(c => ({ value: c.code, label: `${c.code} ${c.name}` }));
  }, []);
  const val = currencyOptions.find(option => option.value === value);

  return (
    <Select
      value={val}
      options={currencyOptions}
       // @ts-ignore
      onChange={onChange}
      components={{ Option: IconOption, Control }}
      placeholder="Select a currency..."
    />
  );
}
export default CurrencyDropdown;
