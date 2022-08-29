import React from 'react';
import './widgetSm.scss';

import { useAppSelector } from '../../hooks/hookRedux';
import { selectNewUsers } from '../../features/users/users-slice';

import WidgetSmItem from './WidgetSmItem';
import { IUser } from '../../types/types';

const WidgetSm: React.FC = () => {
    const newUsers = useAppSelector((state) => selectNewUsers(state));

    return (
        <div className='widgetSm'>
            <span className='widgetSmTitle'>New Join Members</span>
            <ul>
                {newUsers.map((i) => (
                    <WidgetSmItem key={i._id} {...i} />
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
