import * as types from './types';

export function connect(username : string): types.ChatActionTypes {
    return {
        type: types.CONNECT,
        username: username
    };
}

