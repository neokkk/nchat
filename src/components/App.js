import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import ListPage from '../pages/ListPage';
import RoomPage from '../pages/RoomPage';
import ErrorPage from '../pages/ErrorPage';

const App = () => {
    const user = 'null';
    
    return (
        <div>
            <Switch>
                {user ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={LoginPage} />}
                <Route path='/login' exact component={LoginPage} />
                <Route path='/join' exact component={JoinPage} />
                <Route path='/room' exact component={RoomPage} />
                <Route path='/room/list' exact component={ListPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default App;