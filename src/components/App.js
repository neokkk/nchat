import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/Login';
import Join from '../components/Join';
import ListPage from '../pages/ListPage';
import RoomPage from '../pages/RoomPage';
import ErrorPage from '../pages/ErrorPage';

import * as userActions from '../store/user';

const user = 'null';

const App = props => {
    // console.log('props');
    // console.log(props);
    
    useEffect(() => {
        const { UserActions } = props;
        UserActions.getUser();
    }, []);
    
    return (
        <>
            <Switch>
                {user ? <Route path='/' exact component={ListPage} /> : <Route path='/' exact component={Login} />}
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
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        error: state.error
    }), 
    dispatch => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);