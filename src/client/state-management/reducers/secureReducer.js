import * as types from '../actions/types';


const initialState = {
    secureChat: false,
    keyFriend: null,
};

const handleSecureStart = () => ({
    secureChat: true,
});

const handleSecureEnd = () => ({
    secureChat: false,
});


const handlerSaveKey = (key) => ({
    secureChat: true,
    keyFriend: key,
});

const handlers = {
    [types.START_SECURE]: handleSecureStart,
    [types.END_SECURE]: handleSecureEnd,
    [types.SAVE_KEY]: handlerSaveKey
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler(action.key) : state
};