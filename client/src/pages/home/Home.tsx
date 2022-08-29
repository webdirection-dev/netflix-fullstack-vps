import React, { useState, useEffect } from 'react';
import './home.scss';

import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../features/movies/List';

import { IList } from '../../types';
import { useGetList } from './use-get-list';

interface IType {
    type?: string;
}

const Home: React.FC<IType> = ({ type }) => {
    const [genreMoviesList, setGenreMoviesList] = useState('');
    const [genreSeriesList, setGenreSeriesList] = useState('');
    const { lists, homeLists } = useGetList(
        type,
        genreMoviesList,
        genreSeriesList
    );

    return (
        <div className='home'>
            <Navbar />
            <Featured
                type={type}
                genreMoviesList={genreMoviesList}
                setGenreMoviesList={setGenreMoviesList}
                genreSeriesList={genreSeriesList}
                setGenreSeriesList={setGenreSeriesList}
            />

            {!type &&
                homeLists.map((i: IList) => {
                    return <List key={i._id} list={i} />;
                })}

            {type &&
                lists.map((i: IList) => {
                    return <List key={i._id} list={i} />;
                })}
        </div>
    );
};

export default Home;
