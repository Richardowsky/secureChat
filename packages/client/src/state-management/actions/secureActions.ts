import * as types from './types';

export function startSecureChat(): types.ChatActionTypes {
    return {
        type: types.START_SECURE,
    };
}

export function endSecureChat(): types.ChatActionTypes {
    return {
        type: types.END_SECURE,
    }
}

export function saveFriendKey(key): types.ChatActionTypes {
    return {
        type: types.SAVE_KEY,
        key
    }
}