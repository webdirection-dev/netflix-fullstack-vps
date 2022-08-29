import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/listItem.scss';
import {
    Add,
    PlayArrow,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
} from '@mui/icons-material';

interface IListProps {
    movie: { [key: string]: string };
    index: number;
}

const ListItem: React.FC<IListProps> = ({ movie, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const classesListItem = isHovered ? 'listItem' : 'hidden';

    return (
        <Link to='/watch' state={{ movie: movie }}>
            <div
                className='listItemWrapper'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    className='imgPreview'
                    src={movie.imgSm}
                    alt={movie.title}
                />

                <div
                    className={classesListItem}
                    style={{
                        left: (isHovered &&
                            index * 225 - 50 + index * 2.5) as number,
                    }}
                >
                    <img src={movie.imgSm} alt={movie.title} />

                    {isHovered && (
                        <video autoPlay={true} loop muted>
                            <source src={movie.trailer} type='video/mp4' />
                        </video>
                    )}

                    <div className='itemInfo'>
                        <div className='icons'>
                            <PlayArrow className='icon' />
                            <Add className='icon' />
                            <ThumbUpAltOutlined className='icon' />
                            <ThumbDownAltOutlined className='icon' />
                        </div>

                        <div className='itemInfoTop'>
                            <span>{movie.duration}</span>
                            <span className='limit'>+{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>

                        <div className='description'>{movie.description}</div>

                        <div className='genre'>{movie.genre}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListItem;
