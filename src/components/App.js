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
        <Switch>
            {user ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={LoginPage} />}
            <Route path='/login' component={LoginPage} />
            <Route path='/join' component={JoinPage} />
            <Route path='/room' exact component={RoomPage} />
            <Route path='/room/list' component={ListPage} />
            <Route component={ErrorPage} />
        </Switch>
    );
}

export default App;