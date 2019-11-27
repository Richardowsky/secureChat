import { createStore } from "redux";
import reducers from '../reducers/combineReducer';

const store = createStore(reducers);
export default store;