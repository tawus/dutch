import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './appSlice';

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
    });

export default createRootReducer;
