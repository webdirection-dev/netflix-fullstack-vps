import {configureStore} from "@reduxjs/toolkit"
import {rootReducer} from "./features"
import axios, {AxiosStatic} from "axios"

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
            },
        },
    }),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type DetailsExtra = {client: AxiosStatic}