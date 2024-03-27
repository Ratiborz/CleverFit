import { createReduxHistoryContext } from 'redux-first-history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { api } from './api-rtk/api';
import { reducer as calendarSlice } from './reducers/calendar.slice';
import { reducer as commonModalSlice } from './reducers/common-modal.slice';
import { reducer as feedback } from './reducers/feedback.slice';
import { reducer as profileSlice } from './reducers/profile.slice';
import { reducer as registrationReducer } from './reducers/registration.slice';
import { reducer as repeatRequestsSlice } from './reducers/repeat-requests.slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const reducers = combineReducers({
    router: routerReducer,
    [api.reducerPath]: api.reducer,
    registration: registrationReducer,
    repeatRequests: repeatRequestsSlice,
    feedback,
    commonModal: commonModalSlice,
    calendar: calendarSlice,
    profile: profileSlice,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(api.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
