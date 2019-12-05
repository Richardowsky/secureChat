"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("../actions/types");
var initialState = {
    simpleChat: false,
};
var handleSimpleStart = function () { return ({
    simpleChat: true,
}); };
var handleSimpleEnd = function () { return ({
    simpleChat: false,
}); };
var handlers = (_a = {},
    _a[types.START_SIMPLE] = handleSimpleStart,
    _a[types.END_SIMPLE] = handleSimpleEnd,
    _a);
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    var handler = handlers[action.type];
    return handler ? handler() : state;
};
var _a;
