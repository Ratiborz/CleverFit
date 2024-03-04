import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { history, store } from '@redux/configure-store';
import { HistoryRouter } from 'redux-first-history/rr6';
import { routes } from './routes/routes';

import 'normalize.css';
import './index.css';
import { Paths } from './constants';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

window.addEventListener('load', () => {
    sessionStorage.clear();

    if (!localStorage.getItem('isAuthenticated')) {
        history.push(Paths.AUTH);
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
