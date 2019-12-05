import * as types from './types';

export function startSimpleChat(): types.ChatActionTypes {
    return {
        type: types.START_SIMPLE,
    };
}

export function endSimpleChat(): types.ChatActionTypes {
    return {
        type: types.END_SIMPLE,
    }
}
