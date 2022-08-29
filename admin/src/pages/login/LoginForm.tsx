import React, {useState, useContext} from "react"
import {loginCall} from "../../context/apiCalls"
import {AuthContext} from "../../context/authContext/AuthContext"

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        loginCall({email, password}, dispatch)
    }

    return(
        <form className="loginForm">
            <label htmlFor="loginPanel">Users name or Email</label>
            <input
                id='loginPanel'
                className='loginInput'
                type="text"
                placeholder='name or email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="passwordPanel">Password</label>
            <input
                id='passwordPanel'
                className='loginInput'
                type="password"
                placeholder='your password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button
                className="loginBtn"
                onClick={e => handleLogin(e)}
                disabled={isFetching}
            >Sing in</button>
        </form>
    )
}

export default LoginForm