import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import groupsReducer from '../features/groups/groupsSlice';
import groupsFilterReducer from '../features/groups/groupsFilterSlice';
import contactsReducer from '../features/contacts/contactsSlice';
import contactsFilterReducer from '../features/contacts/contactsFilterSlice';
import appReducer from './appSlice';

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        contacts: contactsReducer,
        contactsFilter: contactsFilterReducer,
        groups: groupsReducer,
        groupsFilter: groupsFilterReducer,
    });

export default createRootReducer;
