import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AnyAction,
} from '@reduxjs/toolkit';

import { RootState, DetailsExtra } from '../../store';

interface stringObject {
    [key: string]: string;
}

interface ILoginCall {
    username?: string;
    email: string;
    password: string;
}

type TAuthState = {
    status: string;
    error: null | string;
    user: stringObject | null;
};

export const registerUser = createAsyncThunk<
    stringObject,
    ILoginCall,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@auth/register',

    async (inputs, { extra: { client }, rejectWithValue }) => {
        return await client
            .post('/auth/register', inputs)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const getLogin = createAsyncThunk<
    stringObject,
    ILoginCall,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@auth/get-login',

    async (inputs, { extra: { client }, rejectWithValue }) => {
        return await client
            .post('/auth/login', {
                email: inputs.email,
                password: inputs.password,
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

const initialState: TAuthState = {
    status: 'idle', // loading | received | rejected
    error: null,
    user: JSON.parse(localStorage.getItem('user') as string) || null,
};

const authSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        logout(state) {
            state.status = 'received';
            state.error = null;
            state.user = null;
            localStorage.setItem('user', JSON.stringify(null));
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));

                state.status = 'received';
                state.user = action.payload;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));

                state.status = 'received';
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

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

//selectors
export const selectAuthInfo = (state: RootState) => ({
    status: state.auth.status,
    error: state.auth.error,
});

export const selectAuthUser = (state: RootState) => state.auth.user;

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending');
}
