import * as io from 'socket.io-client';
import repl from 'repl';
import chalk from 'chalk';
import crypto from 'cryptico-js';
import store from "../store";
import {start} from "../actions/actions";
import {initialState} from "../reducers";


export let username, RSAkey, publicKeyStringMy, publicKeyStringFriend, message, publicRSA;
export const socket = io.connect('http://localhost:3000');
const bits = 2048;

socket.on('disconnect', function () {
    socket.emit('disconnect')
});


socket.on('connect', function () {
    console.log(chalk.red('=== start chatting ==='));
    username = process.argv[2];
    RSAkey = crypto.generateRSAKey(username, bits);
    publicKeyStringMy = crypto.publicKeyString(RSAkey);
});


socket.on('message', async function (data) {
    let {message, username, publicRSA} = data;
    publicKeyStringFriend = publicRSA;
    if (initialState === 2) {
        message = await crypto.decrypt(message, RSAkey).plaintext;
        console.log(chalk.blue(username + ': ' + message));
    } else {
        console.log(chalk.green(username + ': ' + message));
    }
});


repl.start({
    eval: async function (cmd) {
        store.dispatch(start(cmd));
    }
});

export function setPublicKeyStringFriend(PK) {
    publicKeyStringFriend = PK;
}