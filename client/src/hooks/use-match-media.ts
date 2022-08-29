import { useState, useLayoutEffect } from 'react';

const queries = [
    '(max-width: 766px)',
    '(min-width: 767px) and (max-width: 1199px)',
    '(min-width: 1200px) and (max-width: 1439px)',
    '(min-width: 1440px) and (max-width: 1699px)',
    '(min-width: 1700px)',
];

const devices = ['isMobile', 'isTablet', 'isDesktop', 'isMac', 'isMacPro'];

export const useMatchMedia = () => {
    const mediaQueryLists = queries.map((i) => matchMedia(i));
    const getValues = () => mediaQueryLists.map((i) => i.matches); // массив булевх значений matches
    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues);
        mediaQueryLists.forEach((i) => i.addEventListener('change', handler));

        return () => {
            mediaQueryLists.forEach((i) =>
                i.removeEventListener('change', handler)
            );
        };
    });

    return devices.reduce(
        (acc, curr, index) => ({
            ...acc,
            [curr]: values[index],
        }),
        {}
    );
};
