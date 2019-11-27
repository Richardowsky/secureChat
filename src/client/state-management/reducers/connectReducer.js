import * as types from '../actions/types';
import forge from 'node-forge';

const initialState = {
    username: null
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

