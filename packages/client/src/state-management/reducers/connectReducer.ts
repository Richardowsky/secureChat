import * as forge from 'node-forge';
import * as types from '../actions/types';

const initialState = {
    username: null,
    keyPair:null
};

const handleConnect = (username) => ({
    username,
    keyPair: forge.pki.rsa.generateKeyPair(2048, username),

});

const handlers = {
    [types.CONNECT]: handleConnect,
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler(action.username) : state

};

