import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss';

import logo from '../../img/logo.png';
import avatar from '../../img/avatar.jpeg';
import { Search, Notifications, ArrowDropDown } from '@mui/icons-material';

import { useAppDispatch } from '../../store';
import { logout } from '../../features/auth/auth_slice';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('./login');
    };

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset !== 0);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className='container'>
                <div className='left'>
                    <img src={logo} alt='logo' />

                    <Link to='/' className='link'>
                        <span>Homepage</span>
                    </Link>
                    <Link to='/series' className='link'>
                        <span className='mainLinks'>Series</span>
                    </Link>
                    <Link to='/movies' className='link'>
                        <span className='mainLinks'>Movies</span>
                    </Link>

                    <span>New and Popular</span>
                    <span>My List</span>
                </div>

                <div className='right'>
                    <Search className='icon' />
                    <span>KID</span>
                    <Notifications className='icon' />
                    <img src={avatar} alt='avatar' />

                    <div className='profile'>
                        <ArrowDropDown className='icon' />

                        <div className='options'>
                            <a href='http://admin.webdirection.org'>Admin Panel</a>
                            <span>Settings</span>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
