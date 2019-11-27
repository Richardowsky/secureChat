
import * as types from './types';

export function startSimpleChat() {
    return {
        type: types.START_SIMPLE,
    };
}


export function endSimpleChat() {
    return {
        type: types.END_SIMPLE,
    }
}
