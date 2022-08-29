import {createContext, useReducer, PropsWithChildren, ReducerWithoutAction, useEffect} from "react"
import AuthReducer from "./AuthReducer"
import {IAuthUserState} from "../../types/apiTypes"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') as string) || null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext<IAuthUserState>(INITIAL_STATE)

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(
        AuthReducer as ReducerWithoutAction<IAuthUserState>,
        INITIAL_STATE
    )

    const value = {
        ...state,
        dispatch,
    }

    useEffect(() => {

        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}