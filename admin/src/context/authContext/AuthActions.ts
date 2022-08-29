import {IUser} from "../../types/types"

//login
export const loginStart = () => ({
    type: 'LOGIN_START',
})

export const loginSuccess = (user: IUser) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
})

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
})

//logout
export const logoutStart = () => ({
    type: 'LOGOUT',
})