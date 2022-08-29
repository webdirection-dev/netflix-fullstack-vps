import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AnyAction,
} from '@reduxjs/toolkit';
import { RootState, DetailsExtra } from '../../store';

interface IClientMovie {
    [key: string]: string;
}

type TClientMovieState = {
    status: string;
    error: null | string;
    movies: IClientMovie[];
};

export const getMovies = createAsyncThunk<
    IClientMovie[],
    undefined,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@client-movies/get-movies',

    async (_, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user') as string) || null;
        const token = 'Bearer ' + user.accessToken;

        return await client
            .get('/movies', {
                headers: {
                    authorization: token,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

const initialState: TClientMovieState = {
    status: 'idle', // loading | received | rejected
    error: null,
    movies: [],
};

const clientMoviesSlice = createSlice({
    name: '@@client-movies',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                state.status = 'received';
                state.movies = action.payload;
            })

            .addMatcher(isPending, (state, action: PayloadAction<string>) => {
                state.error = null;
                state.status = 'loading';
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'rejected';
            });
    },
});

// export const {someReducer} = clientMoviesSlice.actions
export const clientMoviesReducer = clientMoviesSlice.reducer;

//selectors
export const selectMoviesInfo = (state: RootState) => ({
    status: state.clientMovies.status,
    error: state.clientMovies.error,
    qty: state.clientMovies.movies.length,
});

export const selectAllMovies = (state: RootState) => state.clientMovies.movies;
export const selectMovieById = (state: RootState, id: string) =>
    state.clientMovies.movies.find((i) => i._id === id);

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending');
}
