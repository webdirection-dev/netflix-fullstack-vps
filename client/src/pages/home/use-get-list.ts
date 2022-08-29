import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGetList = (
    type?: string,
    genreMoviesList?: string,
    genreSeriesList?: string
) => {
    const [lists, setLists] = useState([]);
    const [homeLists, setHomeLists] = useState([]);

    const genre = type === 'movies' ? genreMoviesList : genreSeriesList;

    useEffect(() => {
        const getRandomList = async () => {
            const user =
                JSON.parse(localStorage.getItem('user') as string) || null;
            const token = 'Bearer ' + user.accessToken;

            try {
                const res = await axios.get(
                    `/lists${type ? '?type=' + type : ''}${
                        genre !== '' ? '&genre=' + genre : ''
                    }`,
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (type) setLists(res.data);
                else setHomeLists(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        getRandomList();
    }, [type, genre]);

    return { lists, homeLists };
};
