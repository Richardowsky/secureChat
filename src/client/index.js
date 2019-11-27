import * as io from 'socket.io-client';
import repl from 'repl';
import chalk from 'chalk';
import forge from 'node-forge';
import store from "./state-management/store";
import {connect} from "./state-management/actions/conectActions";
import {endSimpleChat, startSimpleChat} from "./state-management/actions/simpleActions";
import {endSecureChat, saveFriendKey, startSecureChat} from "./state-management/actions/secureActions";

const socket = io.connect('http://localhost:3000');
let message;

socket.on('disconnect', function () {
    socket.emit('disconnect')
});

socket.on('connect', function () {
    console.log(chalk.red('=== start chatting ==='));
    const username = process.argv[2];
    store.dispatch(connect(username))
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
        store.dispatch(saveFriendKey(data.key));
    }
});


repl.start({
    eval: async function (cmd) {
        switch (cmd) {
            case ('/start\n' || '/confirm\n'):
                store.dispatch(startSimpleChat());
                break;
            case ('/start_secure\n' || '/verify_secure\n'):
                store.dispatch(endSimpleChat());
                store.dispatch(startSecureChat());
                socket.send({
                    // message: "start secure chat",
                    username: store.getState().connectState.username,
                    key: forge.pki.publicKeyToPem(store.getState().connectState.keyPair.publicKey)
                });
                break;
            case ('/end_secure\n'):
                store.dispatch(endSecureChat());
                store.dispatch(startSimpleChat());
                break;
            default:
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
                break;
        }
    }
});
