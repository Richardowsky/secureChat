const socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl');
const chalk = require('chalk');
const crypto = require('cryptico-js');
// const {START, CONFIRM, START_SECURE, VERIFY_SECURE, SECURE, UNSECURED, END_SECURE} = require('types');

let username, properties, RSAkey, publicKeyStringMy, publicKeyStringFriend, message, publicRSA;
const bits = 2048;
const START = "/start\n";
const CONFIRM = "/confirm\n";
const START_SECURE = '/start_secure\n';
const VERIFY_SECURE = '/verify_secure\n';
const SECURE = 2;
const UNSECURED = 1;
const END_SECURE = '/end_secure\n';


const handleStart = function () {
    message = "Confirm starting?";
    properties = 1;
    socket.send({message, username});
};


const handleConfirm = function () {
    message = "Confirmed";
    properties = 1;
    socket.send({message, username});
};


const handleStartSecure = function () {
    publicRSA = publicKeyStringMy;
    message = "Confirm starting secure?";
    socket.send({message, username, publicRSA});
    properties = 2;
};


const handleVerifySecure = function () {
    const EncryptionResult = crypto.encrypt("Confirmed", publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    message = cipher.toString();
    publicRSA = publicKeyStringMy;
    socket.send({message, username, publicRSA});
    properties = 2;
};


const unsecuredHandler = function (cmd) {
    message = cmd;
    socket.send({message, username})
};


const securedHandler = function (cmd) {
    const EncryptionResult = crypto.encrypt(cmd, publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    if (cipher !== undefined) {
        message = cipher.toString();
    }
    socket.send({message, username, publicRSA})
};


const endSecuredHandler = function () {
    const EncryptionResult = crypto.encrypt("Leave secure chat", publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    message = cipher.toString();
    socket.send({message, username, publicRSA});
    publicKeyStringFriend = null;
    properties = 1;
};


const handlers = {
    [START]: handleStart,
    [CONFIRM]: handleConfirm,
    [START_SECURE]: handleStartSecure,
    [VERIFY_SECURE]: handleVerifySecure,
    [UNSECURED]: unsecuredHandler,
    [SECURE]: securedHandler,
    [END_SECURE]: endSecuredHandler,

};


socket.on('disconnect', function () {
    socket.emit('disconnect')
});


socket.on('connect', () => {
    console.log(chalk.red('=== start chatting ==='));
    username = process.argv[2];
    RSAkey = crypto.generateRSAKey(username, bits);
    publicKeyStringMy = crypto.publicKeyString(RSAkey);
});


socket.on('message', async (data) => {
    let {message, username, publicRSA} = data;
    publicKeyStringFriend = publicRSA;
    if (properties === 2) {
        const result = await crypto.decrypt(message, RSAkey);
        message = result.plaintext;
        console.log(chalk.blue(username + ': ' + message));
    } else {
        console.log(chalk.green(username + ': ' + message));
    }
});


repl.start({
    eval: async (cmd) => {
        const handler = await handlers[cmd];
        const handlerMessage = await handlers[properties];
        return handler ? handler() : handlerMessage(cmd);
    }
});


