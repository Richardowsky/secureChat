"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var combineReducer_1 = require("../reducers/combineReducer");
var store = redux_1.createStore(combineReducer_1.reducers);
exports.default = store;
