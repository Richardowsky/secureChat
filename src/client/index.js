import * as io from 'socket.io-client';
import repl from 'repl';
import chalk from 'chalk';
import forge from 'node-forge';
import store from "./state-management/store";
import actions from "./state-management/actions";

const socket = io.connect('http://localhost:3000');
let message;
const START = "/start\n";
const CONFIRM = "/confirm\n";
const START_SECURE = '/start_secure\n';
const VERIFY_SECURE = '/verify_secure\n';
const END_SECURE = '/end_secure\n';


const handleStart = function () {
    store.dispatch(actions.startSimpleChat());
};


const handleStartSecure = function () {
    store.dispatch(actions.endSimpleChat());
    store.dispatch(actions.startSecureChat());
    socket.send({
        username: store.getState().connectState.username,
        key: forge.pki.publicKeyToPem(store.getState().connectState.keyPair.publicKey)
    });
};


const endSecuredHandler = function () {
    store.dispatch(actions.endSecureChat());
    store.dispatch(actions.startSimpleChat());
};


const messageHandler = function (cmd) {
    if (store.getState().secureState.secureChat) {
        message = forge.pki.publicKeyFromPem(store.getState().secureState.keyFriend).encrypt(cmd);
        socket.send({
            message,
            username: store.getState().connectState.username,
            key: forge.pki.publicKeyToPem(store.getState().connectState.keyPair.publicKey)
        })
    } else if (store.getState().simpleState.simpleChat) {
        socket.send({message: cmd, username: store.getState().connectState.username})
    }
};


const handlers = {
    [START]: handleStart,
    [CONFIRM]: handleStart,
    [START_SECURE]: handleStartSecure,
    [VERIFY_SECURE]: handleStartSecure,
    [END_SECURE]: endSecuredHandler,
};

socket.on('disconnect', function () {
    socket.emit('disconnect')
});

socket.on('connect', function () {
    console.log(chalk.red('=== start chatting ==='));
    const username = process.argv[2];
    store.dispatch(actions.connect(username))
});


socket.on('message', function (data) {
    if (store.getState().secureState.secureChat && data.message !== undefined) {
        const privateKey = forge.pki.privateKeyToPem(store.getState().connectState.keyPair.privateKey);
        const message = forge.pki.privateKeyFromPem(privateKey).decrypt(data.message);
        console.log(chalk.blue(data.username + ': ' + message));
    } else {
        console.log(chalk.green(data.username + ': ' + data.message));
    }
    if (data.key !== undefined) {
        store.dispatch(actions.saveFriendKey(data.key));
    }
});


repl.start({
    eval: async (cmd) => {
        const handler = await handlers[cmd];
        return handler ? handler() : messageHandler(cmd);
    }
});
