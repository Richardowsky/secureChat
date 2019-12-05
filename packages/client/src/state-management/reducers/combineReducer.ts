import {combineReducers} from 'redux';
import connectReducer from './connectReducer';
import secureReducer from './secureReducer';
import simpleReducer from './simpleReducer';

export const reducers =  combineReducers({
        connectState: connectReducer,
        secureState: secureReducer,
        simpleState: simpleReducer

});
