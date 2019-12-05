"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var repl = require("repl");
var chalk = require("chalk");
var forge = require("node-forge");
var store_1 = require("./state-management/store");
var actions_1 = require("./state-management/actions");
var socket = io.connect('http://localhost:3000');
var message;
var START = "/start\n";
var CONFIRM = "/confirm\n";
var START_SECURE = '/start_secure\n';
var VERIFY_SECURE = '/verify_secure\n';
var END_SECURE = '/end_secure\n';
var handleStart = function () {
    store_1.default.dispatch(actions_1.default.startSimpleChat());
};
var handleStartSecure = function () {
    store_1.default.dispatch(actions_1.default.endSimpleChat());
    store_1.default.dispatch(actions_1.default.startSecureChat());
    socket.send({
        username: store_1.default.getState().connectState.username,
        key: forge.pki.publicKeyToPem(store_1.default.getState().connectState.keyPair.publicKey)
    });
};
var endSecuredHandler = function () {
    store_1.default.dispatch(actions_1.default.endSecureChat());
    store_1.default.dispatch(actions_1.default.startSimpleChat());
};
var messageHandler = function (cmd) {
    if (store_1.default.getState().secureState.secureChat) {
        message = forge.pki.publicKeyFromPem(store_1.default.getState().secureState.keyFriend).encrypt(cmd);
        socket.send({
            message: message,
            username: store_1.default.getState().connectState.username,
            key: forge.pki.publicKeyToPem(store_1.default.getState().connectState.keyPair.publicKey)
        });
    }
    else if (store_1.default.getState().simpleState.simpleChat) {
        socket.send({ message: cmd, username: store_1.default.getState().connectState.username });
    }
};
var handlers = (_a = {},
    _a[START] = handleStart,
    _a[CONFIRM] = handleStart,
    _a[START_SECURE] = handleStartSecure,
    _a[VERIFY_SECURE] = handleStartSecure,
    _a[END_SECURE] = endSecuredHandler,
    _a);
socket.on('disconnect', function () {
    socket.emit('disconnect');
});
socket.on('connect', function () {
    console.log(chalk.red('=== start chatting ==='));
    var username = process.argv[2];
    store_1.default.dispatch(actions_1.default.connect(username));
});
socket.on('message', function (data) {
    if (store_1.default.getState().secureState.secureChat && data.message !== undefined) {
        var privateKey = forge.pki.privateKeyToPem(store_1.default.getState().connectState.keyPair.privateKey);
        var message_1 = forge.pki.privateKeyFromPem(privateKey).decrypt(data.message);
        console.log(chalk.blue(data.username + ': ' + message_1));
    }
    else {
        console.log(chalk.green(data.username + ': ' + data.message));
    }
    if (data.key !== undefined) {
        store_1.default.dispatch(actions_1.default.saveFriendKey(data.key));
    }
});
repl.start({
    eval: function (cmd) {
        var handler = handlers[cmd];
        return handler ? handler() : messageHandler(cmd);
    }
});
var _a;
