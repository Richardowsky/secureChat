"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("../actions/types");
var forge = require("node-forge");
var initialState = {
    username: null,
    keyPair: null
};
var handleConnect = function (username) { return ({
    username: username,
    keyPair: forge.pki.rsa.generateKeyPair(2048, username),
}); };
var handlers = (_a = {},
    _a[types.CONNECT] = handleConnect,
    _a);
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    var handler = handlers[action.type];
    return handler ? handler(action.username) : state;
};
var _a;
