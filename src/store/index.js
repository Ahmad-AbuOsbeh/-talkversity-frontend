import { createStore, combineReducers } from 'redux';
import signInReducer from './reducers/signIn.reducer';
import authReducer from './reducers/auth.reducer';

// use combine reducers
const reducers = combineReducers({ signInReducer, authReducer });

// export the store after creating it
export default createStore(reducers);
