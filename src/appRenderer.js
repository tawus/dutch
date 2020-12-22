import React from 'react';
import configureStore from './app/store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

const history = createBrowserHistory();
export const store = configureStore(history);

const appRenderer = component => (
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>{component}</ConnectedRouter>
        </Provider>
    </React.StrictMode>
);

export default appRenderer;
