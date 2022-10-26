import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store';
import { registerUser } from '../../features/auth/auth_slice';

import './register.scss';
import logo from '../../img/logo.png';

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleUsername = () => {
        if (usernameRef.current !== null)
            setUsername(usernameRef.current.value);
    };

    const handleStart = () => {
        if (emailRef.current !== null) setEmail(emailRef.current.value);
    };

    const handleFinish = () => {
        if (passwordRef.current !== null)
            setPassword(passwordRef.current.value);
    };

    useEffect(() => {
        if (username !== '' && email !== '' && password !== '') {
            dispatch(registerUser({ username, email, password }));
            navigate('/login');
        }
    }, [username, email, password]);

    return (
        <div className='register'>
            <div className='top'>
                <div className='wrapper'>
                    {/*<img className='logo' src={logo} alt='logo' />*/}

                    <button
                        className='loginButton'
                        onClick={() => navigate('/login')}
                    >
                        Sing In
                    </button>
                </div>
            </div>

            <div className='container'>
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your
                    membership.
                </p>

                <>
                    {!username && (
                        <div className='input'>
                            <input
                                type='text'
                                placeholder='username'
                                ref={usernameRef}
                            />
                            <button
                                className='registerButton'
                                onClick={handleUsername}
                            >
                                Get Started
                            </button>
                        </div>
                    )}

                    {username && !email && (
                        <div className='input'>
                            <input
                                type='email'
                                placeholder='email address'
                                ref={emailRef}
                            />
                            <button
                                className='registerButton'
                                onClick={handleStart}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {username && email && (
                        <div className='input'>
                            <input
                                type='password'
                                placeholder='password'
                                ref={passwordRef}
                            />
                            <button
                                className='registerButton'
                                onClick={handleFinish}
                            >
                                Start
                            </button>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default Register;
