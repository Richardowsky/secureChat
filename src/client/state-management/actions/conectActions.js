import * as types from './types';

export function connect(username) {
    return {
        type: types.CONNECT,
        username: username
    };
}

