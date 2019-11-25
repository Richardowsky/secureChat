import {CONFIRM, END_SECURE, SECURE, START, START_SECURE, UNSECURED, VERIFY_SECURE} from '../actions'
import crypto from 'cryptico-js';
import * as client from '../client';
import {publicRSA, username} from '../client';

let message;
export let initialState = 0;

const handleStart = function () {
    client.socket.send({message: 'Confirm starting?', username: client.username});
   initialState = 1;
};


const handleConfirm = function () {
    client.socket.send({message: 'Confirmed', username});
    initialState = 1;
};


const handleStartSecure = function () {
    client.socket.send({message: 'Confirm starting secure?', username, publicRSA: client.publicKeyStringMy});
    initialState = 2;
};


const handleVerifySecure = function () {
    const EncryptionResult = crypto.encrypt("Confirmed", client.publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    if (cipher !== undefined) {
        message = cipher.toString();
    }
    client.socket.send({message, username, publicRSA: client.publicKeyStringMy});
    initialState = 2;
};


const handlerUnsecured = function (cmd) {
    client.socket.send({message: cmd, username})
};


const handlerSecured = function (cmd) {
    const EncryptionResult = crypto.encrypt(cmd, client.publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    if (cipher !== undefined) {
        message = cipher.toString();
    }
    client.socket.send({message, username, publicRSA: client.publicKeyStringMy})
};


const handlerEndSecured = function () {
    const EncryptionResult = crypto.encrypt("Leave secure chat", client.publicKeyStringFriend);
    const cipher = EncryptionResult.cipher;
    if (cipher !== undefined) {
        message = cipher.toString();
    }
    client.socket.send({message, username, publicRSA});
    client.setPublicKeyStringFriend(null);
    initialState = 1;
};


const index = {
    [START]: handleStart,
    [CONFIRM]: handleConfirm,
    [START_SECURE]: handleStartSecure,
    [VERIFY_SECURE]: handleVerifySecure,
    [UNSECURED]: handlerUnsecured,
    [SECURE]: handlerSecured,
    [END_SECURE]: handlerEndSecured,
};

export default (state = initialState, action) => {
    const handler = index[action.type];
    try {
        const handlerMessage = index[initialState];
        return handler ? handler() : handlerMessage(action.message);
    } catch (e) {
        console.log("You dont start chat! Please type - /start")
    }
};
