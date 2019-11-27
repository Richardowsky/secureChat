
import * as types from './types';

export function startSecureChat() {
    return {
        type: types.START_SECURE,
    };
}


export function endSecureChat() {
    return {
        type: types.END_SECURE,
    }
}

export function saveFriendKey(key) {
    return {
        type: types.SAVE_KEY,
        key
    }
}