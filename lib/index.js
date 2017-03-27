"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultPayloadCreator = function defaultPayloadCreator(payload) {
  return payload;
};

var createAction = exports.createAction = function createAction(type) {
  var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPayloadCreator;
  return function () {
    return { type: type, payload: payloadCreator.apply(undefined, arguments) };
  };
};

var createReducer = exports.createReducer = function createReducer(defatulState, actionHandlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defatulState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (action.type && actionHandlers[action.type]) {
      return _extends({}, state, actionHandlers[action.type](action.payload, state, action));
    }
    return state;
  };
};