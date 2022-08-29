import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss';

import { ArrowBackOutlined } from '@mui/icons-material';
import { IMovieInfo } from '../../types';

interface IMovie {
    movie: IMovieInfo;
}

const Watch: React.FC = () => {
    const { movie } = useLocation().state as IMovie;
    const { video } = movie;

    return (
        <div className='watch'>
            <Link to='/'>
                <div className='back'>
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>

            <video className='video' src={video} autoPlay controls></video>
        </div>
    );
};

export default Watch;
