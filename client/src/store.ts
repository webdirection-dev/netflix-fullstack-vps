import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import axios, {AxiosStatic} from 'axios';

import {authReducer} from './features/auth/auth_slice';
import {clientMoviesReducer} from './features/movies/movie-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    clientMovies: clientMoviesReducer,
});

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    client: axios,
                },
            },
        }),

    devTools: true,
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type DetailsExtra = { client: AxiosStatic };
