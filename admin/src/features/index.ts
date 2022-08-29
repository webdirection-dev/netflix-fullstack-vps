import { combineReducers } from '@reduxjs/toolkit';

import { usersReducer } from './users/users-slice';
import { moviesReducer } from './movies/movies-slice';
import { moviesListReducer } from './lists/movies-list-slice';

export const rootReducer = combineReducers({
    users: usersReducer,
    movies: moviesReducer,
    moviesList: moviesListReducer,
});
