"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./types");
function startSecureChat() {
    return {
        type: types.START_SECURE,
    };
}
exports.startSecureChat = startSecureChat;
function endSecureChat() {
    return {
        type: types.END_SECURE,
    };
}
exports.endSecureChat = endSecureChat;
function saveFriendKey(key) {
    return {
        type: types.SAVE_KEY,
        key: key
    };
}
exports.saveFriendKey = saveFriendKey;
