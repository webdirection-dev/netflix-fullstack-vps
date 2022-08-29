import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import logo from '../../img/logo.png';

import { useAppDispatch, useAppSelector } from '../../store';
import { getLogin, selectAuthInfo } from '../../features/auth/auth_slice';

const Login: React.FC = () => {
    const authInfo = useAppSelector((state) => selectAuthInfo(state));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userCredential, setUserCredential] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, value } = e.target;

        setUserCredential({
            ...userCredential,
            [type]: value,
        });
    };

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        dispatch(getLogin(userCredential));
    };

    return (
        <div className='login'>
            <div className='top'>
                <div className='wrapper'>
                    <img className='logo' src={logo} alt='logo' />
                </div>
            </div>

            <div className='container'>
                <form>
                    <h1>Sing In</h1>

                    <input
                        type='email'
                        placeholder='Email or phone number'
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => handleChange(e)}
                    />

                    <button
                        className='loginButton'
                        onClick={(e) => handleSubmit(e)}
                        disabled={authInfo.status === 'loading'}
                    >
                        Sing In
                    </button>

                    <span onClick={() => navigate('/register')}>
                        New to Netflix? <b>Sing up now.</b>
                    </span>

                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
