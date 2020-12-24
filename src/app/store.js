import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { readState, writeState } from './localStorage';
import throttle from '../utils/throttle';

const PERSISTENT_KEYS = ['groups', 'contacts', 'app'];

const configureAppStore = history => {
    const rootReducer = createRootReducer(history);
    const store = configureStore({
        reducer: rootReducer,
        middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
        preloadedState: readState(),
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(rootReducer)
        );
    }

    store.subscribe(
        throttle(() => {
            writeState(filterPersistantState(store.getState()));
        }, 1000)
    );

    return store;
};

export default configureAppStore;

const filterPersistantState = state =>
    PERSISTENT_KEYS.reduce(
        (pstate, key) => ({ ...pstate, [key]: state[key] }),
        {}
    );
