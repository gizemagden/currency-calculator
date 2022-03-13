import * as ACTION_TYPES from './ActionTypes';

export function updateSettings(props: any) {
  return { type: ACTION_TYPES.UPDATE_SETTINGS, props }
}
