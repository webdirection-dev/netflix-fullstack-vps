import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
// import axios from 'axios';
import {axiosInstance as axios} from "../../store";

import { IMovieInfo } from '../../types';
import './featured.scss';

interface IFeatured {
    type?: string;
    genreMoviesList: string;
    setGenreMoviesList: React.Dispatch<React.SetStateAction<string>>;
    genreSeriesList: string;
    setGenreSeriesList: React.Dispatch<React.SetStateAction<string>>;
}

const Featured: React.FC<IFeatured> = ({
    type,
    genreMoviesList,
    setGenreMoviesList,
    genreSeriesList,
    setGenreSeriesList,
}) => {
    const [content, setContent] = useState({} as IMovieInfo);
    const { title, img, imgTitle, description } = content;

    useEffect(() => {
        const getRandomContent = async () => {
            const user =
                JSON.parse(localStorage.getItem('user') as string) || null;
            const token = 'Bearer ' + user.accessToken;

            try {
                const res = await axios.get(`/movies/random?type=${type}`, {
                    headers: {
                        authorization: token,
                    },
                });

                setContent(res.data[0]);
            } catch (err) {
                console.error(err);
            }
        };

        getRandomContent();
    }, [type]);

    return (
        <div className='featured'>
            {type && type === 'movies' && (
                <div className='category'>
                    <span>Movies</span>

                    <select
                        name='genreMovies'
                        id='genreMovies'
                        onChange={(e) => setGenreMoviesList(e.target.value)}
                        defaultValue={genreMoviesList}
                    >
                        <option value=''>All genres</option>
                        <option value='adventure'>Adventure</option>
                        <option value='comedy'>Comedy</option>
                        <option value='crime'>Crime</option>
                        <option value='fantasy'>Fantasy</option>
                        <option value='historical'>Historical</option>
                        <option value='horror'>Horror</option>
                        <option value='romance'>Romance</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='thriller'>Thriller</option>
                        <option value='western'>Western</option>
                        <option value='animation'>Animation</option>
                        <option value='drama'>Drama</option>
                        <option value='documentary'>Documentary</option>
                    </select>
                </div>
            )}

            {type && type === 'series' && (
                <div className='category'>
                    <span>Series</span>

                    <select
                        name='genreSeries'
                        id='genreSeries'
                        onChange={(e) => setGenreSeriesList(e.target.value)}
                        defaultValue={genreSeriesList}
                    >
                        <option value=''>All genres</option>
                        <option value='adventure'>Adventure</option>
                        <option value='comedy'>Comedy</option>
                        <option value='crime'>Crime</option>
                        <option value='fantasy'>Fantasy</option>
                        <option value='historical'>Historical</option>
                        <option value='horror'>Horror</option>
                        <option value='romance'>Romance</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='thriller'>Thriller</option>
                        <option value='western'>Western</option>
                        <option value='animation'>Animation</option>
                        <option value='drama'>Drama</option>
                        <option value='documentary'>Documentary</option>
                    </select>
                </div>
            )}

            <img src={img} alt={title} />

            <div className='info'>
                <img src={imgTitle} alt={title} />

                <span className='description'>{description}</span>

                <div className='buttons'>
                    <Link
                        to='/watch'
                        state={{ movie: content }}
                        className='play'
                    >
                        <PlayArrow />
                        <span>Play</span>
                    </Link>

                    <button className='more'>
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
