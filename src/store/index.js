import { createStore, combineReducers } from 'redux';
import signInReducer from './reducers/signIn.reducer';
import authReducer from './reducers/auth.reducer';

const reducers = combineReducers({ signInReducer, authReducer });
export default createStore(reducers);
