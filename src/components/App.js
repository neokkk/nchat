import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login';
import Join from '../components/Join';
import ListPage from '../pages/ListPage';
import RoomPage from '../pages/RoomPage';
import ErrorPage from '../pages/ErrorPage';

const App = () => {
    const user = null;
    
    return (
        <>
            <Switch>
                {user ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={Login} />}
                <Route path='/login' component={Login} />
                <Route path='/join' component={Join} />
                <Route path='/list' exact component={ListPage} />
                <Route path='/room' exact component={RoomPage} />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}

export default App;