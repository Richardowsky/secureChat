"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var connectReducer_1 = require("./connectReducer");
var secureReducer_1 = require("./secureReducer");
var simpleReducer_1 = require("./simpleReducer");
//
exports.reducers = redux_1.combineReducers({
    connectState: connectReducer_1.default,
    secureState: secureReducer_1.default,
    simpleState: simpleReducer_1.default
});
// export const createRootReducer =  {
//         connectState: connectReducer,
//         secureState: secureReducer,
//         simpleState: simpleReducer
//     return combineReducers(initialReducers);
// };
//
// export type res
// :
// Redusers = reducers;
// export type RootState = ReturnType<typeof reducers> 
