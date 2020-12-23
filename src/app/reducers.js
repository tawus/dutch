import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsReducer from '../features/contacts/contactsSlice';
import contactsFilterReducer from '../features/contacts/contactsFilterSlice';
import appReducer from './appSlice';

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        contacts: contactsReducer,
        contactsFilter: contactsFilterReducer,
    });

export default createRootReducer;
