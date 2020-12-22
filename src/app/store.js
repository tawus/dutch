import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

const configureAppStore = history => {
    const rootReducer = createRootReducer(history);
    const store = configureStore({
        reducer: rootReducer,
        middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(rootReducer)
        );
    }

    return store;
};

export default configureAppStore;
