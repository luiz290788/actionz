/* @flow */
/* eslint-env jest */
import { createAction, createReducer } from '../actionz';

describe('createAction', () => {
  test('should return action creator', () => {
    const payload = {
      myPayloadProperty: 'test',
    };
    const type = 'TEST_TYPE';
    expect(createAction(type)(payload)).toEqual({ type, payload });
  });

  test('should use custom payload creator', () => {
    expect(createAction('TEST_TYPE', (a, b) => ({ a, b }))(10, 20)).toEqual({
      type: 'TEST_TYPE',
      payload: { a: 10, b: 20 },
    });
  });
});

describe('createReducer', () => {
  const stateAfterAction1 = { action: 1 };
  const action1Handler = jest.fn(() => stateAfterAction1);
  const stateAfterAction2 = { action: 2 };
  const action2Handler = jest.fn(() => stateAfterAction2);
  const reducer = createReducer({}, {
    ACTION_1: action1Handler,
    ACTION_2: action2Handler,
  });

  beforeEach(() => {
    action1Handler.mockClear();
    action2Handler.mockClear();
  });

  test('should ignore unknown action', () => {
    const newState = reducer({}, {
      type: 'UNKNOWN_ACTION',
    });

    expect(action1Handler).not.toHaveBeenCalled();
    expect(action2Handler).not.toHaveBeenCalled();

    expect(newState).toEqual({});
  });

  test('should call action 1 handler', () => {
    const action = {
      type: 'ACTION_1',
      payload: 'my-payload',
    };
    const newState = reducer({}, action);

    expect(action1Handler).toHaveBeenCalledTimes(1);
    expect(action1Handler).toHaveBeenCalledWith('my-payload', {}, action);

    expect(action2Handler).not.toHaveBeenCalled();

    expect(newState).toEqual(stateAfterAction1);
  });

  test('should call action 2 handler', () => {
    const action = {
      type: 'ACTION_2',
      payload: 'my-payload',
    };
    const newState = reducer({}, action);

    expect(action1Handler).not.toHaveBeenCalled();

    expect(action2Handler).toHaveBeenCalledTimes(1);
    expect(action2Handler).toHaveBeenCalledWith('my-payload', {}, action);


    expect(newState).toEqual(stateAfterAction2);
  });

  test('should append value to state', () => {
    const action = {
      type: 'ACTION_1',
      payload: 'my-payload',
    };
    const newState = reducer({ value: 1 }, action);

    expect(action1Handler).toHaveBeenCalledTimes(1);
    expect(action1Handler).toHaveBeenCalledWith('my-payload', { value: 1 }, action);

    expect(action2Handler).not.toHaveBeenCalled();

    expect(newState).toEqual({ value: 1, action: 1 });
  });

  test('should return default state', () => {
    const newState = reducer();
    expect(newState).toEqual({});
  });
});
