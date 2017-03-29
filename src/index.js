/* @flow */

const defaultPayloadCreator = payload => payload;

export const createAction = (type: string, payloadCreator: Function = defaultPayloadCreator) =>
  (...args: Array<any>) => ({ type, payload: payloadCreator(...args) });

export const createReducer = (defatulState: any, actionHandlers: Object) =>
  (state: any = defatulState, action: Object = {}) =>
    action.type && actionHandlers[action.type] ? {
      ...state,
      ...(actionHandlers[action.type](action.payload, state, action)),
    } : state;
