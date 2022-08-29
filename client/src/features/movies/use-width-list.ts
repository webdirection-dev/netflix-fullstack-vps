import React, { useEffect, useRef, useState } from 'react';
import { useMatchMedia } from '../../hooks';

interface IMedia {
    [key: string]: boolean;
}

export const useWidthList = () => {
    const { isMacPro, isMac, isDesktop, isTablet, isMobile }: IMedia =
        useMatchMedia();

    const [isMoved, setIsMoved] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    const [translateContainer, setTranslateContainer] = useState(0);

    const handleClick = (direction: string) => {
        const forViewport = isMacPro
            ? 3
            : isMac
            ? 4
            : isDesktop
            ? 5
            : isTablet
            ? 7
            : isMobile
            ? 8
            : 9;

        if (listRef.current !== null) {
            if (direction === 'left' && translateContainer < 0) {
                changeTranslate(
                    listRef,
                    setTranslateContainer,
                    translateContainer + 230
                );
                if (translateContainer >= -230)
                    changeTranslate(listRef, setTranslateContainer, 0);
            }

            if (
                direction === 'right' &&
                translateContainer > -230 * forViewport
            ) {
                changeTranslate(
                    listRef,
                    setTranslateContainer,
                    translateContainer - 230
                );
            }
        }
    };

    useEffect(() => {
        if (translateContainer < 0) setIsMoved(true);
        // if (translateContainer >= 0) setIsMoved(false);
    }, [translateContainer]);

    return { isMoved, listRef, handleClick };
};

//helpers
function step(
    ref: React.RefObject<HTMLDivElement>,
    num: number,
    s?: number | undefined
): void {
    if (ref.current !== null) {
        if (s) ref.current.style.transform = `translateX(${s}px)`;
        if (!s) ref.current.style.transform = `translateX(${num}px)`;
    }
}

function changeTranslate(
    listRef: React.RefObject<HTMLDivElement>,
    setTranslateContainer: React.Dispatch<React.SetStateAction<number>>,
    positionX: number
) {
    setTranslateContainer(positionX);
    step(listRef, positionX);
}
