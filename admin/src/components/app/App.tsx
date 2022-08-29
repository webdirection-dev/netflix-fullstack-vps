import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';

import Login from '../../pages/login/Login';
import Main from '../../layout/Main';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import NotFond from '../../pages/notFound/NotFond';

import { useChangeTheme } from './use-change-theme';
import { AuthContext } from '../../context/authContext/AuthContext';

import { useAppDispatch } from '../../hooks/hookRedux';
import {
    loadUsers,
    loadStats,
    sortUsersByNew,
} from '../../features/users/users-slice';
import { loadMovies } from '../../features/movies/movies-slice';
import { loadMoviesLists } from '../../features/lists/movies-list-slice';

function App() {
    const dispatch = useAppDispatch();
    const { user } = useContext(AuthContext);

    const [dark, setDark] = useState(false);
    useChangeTheme(dark);

    useEffect(() => {
        if (user !== null) {
            const token = user.accessToken as string;

            dispatch(loadUsers(token));
            dispatch(sortUsersByNew(token));
            dispatch(loadStats(token));
            dispatch(loadMovies(token));
            dispatch(loadMoviesLists(token));
        }
    }, [user]);

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={!user && <Navigate to='/login' replace={true} />}
                />
                <Route
                    path='/login'
                    element={
                        user ? <Navigate to='/' replace={true} /> : <Login />
                    }
                />
                <Route path='*' element={!user && <NotFond />} />
            </Routes>

            {user && (
                <div className='app'>
                    <Sidebar setDark={setDark} dark={dark} />

                    <div className='container'>
                        <Navbar setDark={setDark} dark={dark} />
                        <Main />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
