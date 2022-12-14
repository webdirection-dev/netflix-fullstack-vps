import React from 'react';
import './home.scss';

import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import WidgetSm from '../../components/widgetSm/WidgetSm';

import { useGetStat } from './hooks/use-get-stat';
import { useGetWidgetdata } from './hooks/use-get-widgetdata';

const Home: React.FC = () => {
    const { userStat } = useGetStat();
    const { users, movies, lists } = useGetWidgetdata();

    return (
        <div className='home'>
            <div className='widgets'>
                <Widget type='users' counter={users.length} />
                <Widget type='movies' counter={movies.length} />
                <Widget type='lists' counter={lists.length} />
                <Widget type='balance' />
            </div>

            <div className='charts'>
                <Featured />
                <Chart
                    aspect={2 / 1}
                    title='User Analytics'
                    userStat={userStat}
                    myDataKey='New Users'
                />
            </div>

            <div className='userStatWidgets'>
                <WidgetSm />
                <WidgetSm />
                {/* <WidgetLg /> */}
            </div>

            <div className='listContainer'>
                <div className='listTitle'>Latest Transactions</div>
                <Table />
            </div>
        </div>
    );
};

export default Home;
