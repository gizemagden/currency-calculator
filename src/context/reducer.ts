import * as ACTION_TYPES from './ActionTypes';
import { configType, Action } from '../types/context';

export const SettingsReducer = (state: configType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.props
        }
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
