import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActioncreators } from 'redux';
import axios from 'axios';

import '../style/Header.scss';
import * as userActions from '../store/user';

const Header = ({ user, UserActions, ...props }) => {
    const handleClick = () => {
        console.log('click!');

        axios
            .get('http://localhost:5000/auth/logout')
            .then(() => {
                UserActions.logout();
                props.history.push('/login');
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <header>
            <Link to='/'><img src='../../public/images/ball.png' /></Link>
            <div className='header-user'>
                <span>{user.user.nick}</span> 님
                <a onClick={handleClick}>로그아웃</a>
            </div>
        </header>
    );
}

export default connect(
    state => ({
        user: state.user
    }), null
)(Header);