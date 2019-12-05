import * as types from '../actions/types';

const initialState = {
    simpleChat: false,
};


const handleSimpleStart = () => ({
    simpleChat: true,
});

const handleSimpleEnd = () => ({
    simpleChat: false,
});


const handlers = {
    [types.START_SIMPLE]: handleSimpleStart,
    [types.END_SIMPLE]: handleSimpleEnd,
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler() : state
};