"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./types");
function connect(username) {
    return {
        type: types.CONNECT,
        username: username
    };
}
exports.connect = connect;
