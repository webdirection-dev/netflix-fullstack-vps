import React, { useEffect, useState } from 'react';
import './style/list.scss';

import ListItem from './ListItem';

import { useAppSelector } from '../../store';
import { selectAllMovies } from './movie-slice';

import { useWidthList } from './use-width-list';

import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from '@mui/icons-material';

import { IList } from '../../types';

interface IMovieListClient {
    [key: string]: string | number;
}

interface IListProps {
    list: IList;
}

const List: React.FC<IListProps> = ({ list }) => {
    const movies = useAppSelector((state) => selectAllMovies(state));
    const { isMoved, listRef, handleClick } = useWidthList();
    const { title, content } = list;
    const [moviesList, setMoviesList] = useState([] as IMovieListClient[]);

    const classesLeft = isMoved
        ? 'sliderArrow left'
        : 'sliderArrow left hidden';

    useEffect(() => {
        const out: IMovieListClient[] = [];

        if (movies) {
            content.forEach((id, index) => {
                const item = movies.find((movie) => movie._id === id);

                out.push({ ...item, index });

                setMoviesList(out);
            });
        }
    }, [movies]);

    return (
        <div className='list'>
            <span className='listTitle'>{title}</span>

            <div className='viewport' id='test'>
                <ArrowBackIosOutlined
                    className={classesLeft}
                    onClick={() => handleClick('left')}
                />

                <div className='container' ref={listRef}>
                    {moviesList.map((i: any) => {
                        return (
                            <ListItem
                                key={`${Math.random()}`}
                                index={i.index}
                                movie={i}
                            />
                        );
                    })}
                </div>

                <ArrowForwardIosOutlined
                    className='sliderArrow right'
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
};

export default List;
