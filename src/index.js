/* @flow */

const defaultPayloadCreator = payload => payload;

export const createAction = (type: string, payloadCreator: Function = defaultPayloadCreator) =>
  (...args: Array<any>) => ({ type, payload: payloadCreator(...args) });

export const createReducer = (defatulState: any, actionHandlers: Object) =>
  (state: any = defatulState, action: Object = {}) => {
    if (action.type && actionHandlers[action.type]) {
      return {
        ...state,
        ...(actionHandlers[action.type](action.payload, state, action)),
      };
    }
    return state;
  };
