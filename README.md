# Actionz

Small utility for creating [Redux](http://redux.js.org/) [ducks](https://github.com/erikras/ducks-modular-redux).

---

## API

### `createAction(type: string, payloadCreator: Function)`
  Builds an actor creator funciton with `type` and a `payloadCreator` that will receive all arguments passed to the action creator and returns a payload for the action. If no `payloadCreator` is provided, the first argument to the action creator will be used as the payload.

#### Example

```js
const increment = createAction(INCREMENT);
console.log(increment());
/*
  {
    type: 'INCREMENT'
  }
*/

const incrementBy = createAction(INCREMENT_BY);
console.log(incrementBy(2));
/*
  {
    type: 'INCREMENT_BY',
    payload: 2
  }
*/

const incrementThenMultiply = createAction(INCREMENT_THEN_MULTIPLY,
  (inc: number, mult: number) => ({ inc, mult }));
console.log(incrementThenMultiply(2, 3));
/*
  {
    type: 'INCREMENT_THEN_MULTIPLY',
    payload: {
      inc: 2,
      mult: 3
    }
  }
*/
```

### `createReducer(defaultState: Object, actionHandlers: Object)`
  Builds a reducer function with `defaultState` and `actionHandlers`;

#### Example

```js
const reducer = createReducer(defaultState, {
  [INCREMENT]: (payload, { count }) => ({ count: count + 1 }),
  [INCREMENT_BY]: (inc, { count }) => ({ count: count + inc }),
  [DECREMENT]: (payload, { count }) => ({ count: count - 1 }),
  [INCREMENT_THEN_MULTIPLY]: ({ inc, mult }, { count }) => ({ count: (count + inc) * multi }),
});
```

---

Check the examples folder for full examples.
