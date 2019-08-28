/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../components/Login';
import Join from '../components/Join';
import ListPage from '../pages/ListPage';
import RoomPage from '../pages/RoomPage';
import ErrorPage from '../pages/ErrorPage';

const App = props => {
    const { user } = props;
    
    return (
        <>
            <Switch>
                {user.isLoggedIn ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={Login} />}
                <Route path='/login' component={Login} />
                <Route path='/join' component={Join} />
                <Route path='/list' component={ListPage} />
                <Route path='/room/:id' component={RoomPage} />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}

export default connect(
    state => ({ 
        user: state.user
    }), null
)(App);