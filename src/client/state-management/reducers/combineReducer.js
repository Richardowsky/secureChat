import { combineReducers } from 'redux';

import connectReducer from './connectReducer';
import secureReducer from './secureReducer';
import simpleReducer from './simpleReducer';

let reducers = combineReducers({
    connectState: connectReducer,
    secureState: secureReducer,
    simpleState: simpleReducer
});

export default reducers;