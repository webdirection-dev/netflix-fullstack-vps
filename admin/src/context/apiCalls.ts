import axios from "axios"

import {loginFailure, loginStart, loginSuccess} from "./authContext/AuthActions"

import {TAuthDispatch} from "../types/apiTypes"

interface ILoginCall {email: string, password: string}

//login
export const loginCall = async (user: ILoginCall, dispatch: TAuthDispatch) => {
    if (dispatch) dispatch(loginStart())

    try {
        const res = await axios.post(
            '/auth/login',
            {
                email: user.email,
                password: user.password,
            }
        )

        if (dispatch && res.data.isAdmin) dispatch(loginSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(loginFailure())
        console.error(err)
    }
}