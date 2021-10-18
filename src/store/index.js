import { createStore, combineReducers } from 'redux';
import signInReducer from './reducers/signIn.reducer';

const reducers = combineReducers({ signInReducer });
export default createStore(reducers);
