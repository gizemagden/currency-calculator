import React, { createContext, useContext, useReducer, FC } from "react";
import { SettingsReducer } from "./reducer";
// import { getURLParameter } from "../utils"; We could init config via URL parameters...
import { configType } from '../types/context';

const initialConfig: configType = {
  settings: {
    amount: 1,
    baseCurrency: 'USD',
    targetCurrency: 'EUR'
  }
};

const SettingsContext = createContext<configType>(initialConfig);
export const useSettingsContext = () => useContext(SettingsContext);
export const SettingsContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(SettingsReducer, initialConfig);

  return (
    // @ts-ignore
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
