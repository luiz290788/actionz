/* @flow */

import { createAction, createReducer } from '../src/index';

const INCREMENT = 'INCREMENT';
const INCREMENT_BY = 'INCREMENT_BY';
const DECREMENT = 'DECREMENT';
const INCREMENT_THEN_MULTIPLY = 'INCREMENT_THEN_MULTIPLY';

const increment = createAction(INCREMENT);
const incrementBy = createAction(INCREMENT_BY);
const decrement = createAction(DECREMENT);
const incrementThenMultiply = createAction(INCREMENT_THEN_MULTIPLY,
  (inc: number, mult: number) => ({ inc, mult }));

const defaultState = {
  count: 0,
};

const reducer = createReducer(defaultState, {
  [INCREMENT]: (payload, { count }) => ({ count: count + 1 }),
  [INCREMENT_BY]: (inc, { count }) => ({ count: count + inc }),
  [DECREMENT]: (payload, { count }) => ({ count: count - 1 }),
  [INCREMENT_THEN_MULTIPLY]: ({ inc, mult }, { count }) => ({ count: (count + inc) * mult }),
});
