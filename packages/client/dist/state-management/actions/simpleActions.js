"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./types");
function startSimpleChat() {
    return {
        type: types.START_SIMPLE,
    };
}
exports.startSimpleChat = startSimpleChat;
function endSimpleChat() {
    return {
        type: types.END_SIMPLE,
    };
}
exports.endSimpleChat = endSimpleChat;
