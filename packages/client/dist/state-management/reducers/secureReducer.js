"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("../actions/types");
var initialState = {
    secureChat: false,
    keyFriend: null,
};
var handleSecureStart = function (key) { return ({
    secureChat: true,
    keyFriend: key,
}); };
var handleSecureEnd = function (key) { return ({
    secureChat: false,
    keyFriend: key,
}); };
var handlerSaveKey = function (key) { return ({
    secureChat: true,
    keyFriend: key,
}); };
var handlers = (_a = {},
    _a[types.START_SECURE] = handleSecureStart,
    _a[types.END_SECURE] = handleSecureEnd,
    _a[types.SAVE_KEY] = handlerSaveKey,
    _a);
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    var handler = handlers[action.type];
    return handler ? handler(action.key) : state;
};
var _a;
