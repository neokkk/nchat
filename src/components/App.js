import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Login from '../pages/Login';
import Join from '../pages/Join';
import ListPage from '../pages/ListPage';
import RoomPage from '../pages/RoomPage';
import ErrorPage from '../pages/ErrorPage';

const App = () => {
    const user = null;
    
    return (
        <>
            {user ? <Header /> : null}
            <Switch>
                {user ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={Login} />}
                <Route path='/login' component={Login} />
                <Route path='/join' component={Join} />
                <Route path='/room' exact component={RoomPage} />
                <Route path='/list' exact component={ListPage} />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}

export default App;