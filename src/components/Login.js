/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Login.scss';
import * as userActions from '../store/user';

const Login = ({ UserActions }) => {
    const [email, setEmail] = useState('test@test.com'),
          [pwd, setPwd] = useState('test'),
          [message, setMessage] = useState('');


    const handleLocalSubmit = e => {
        e.preventDefault();

        axios
            .post('http://localhost:5000/auth/login', { email, pwd })
            .then(result => {
                const { user, message } = result.data;

                if (user) { // 로그인된 유저가 있으면 성공
                    UserActions.loginSuccess(user);
                } else {
                    UserActions.loginFailure();
                    setMessage(message);
                }
            })
            .catch(err => {
                console.log('axios error');
                console.error(err);
            });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='login'>
                <a href='/'><img src='../../public/images/ball.png' /></a>
                <form onSubmit={handleLocalSubmit}>
                    {message ? <p className='login-error'>{message}</p> : null}
                    <input type='email' name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' name='pwd' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' required />
                    <input type='submit' value='로그인' />
                    <div>
                        <a></a>
                        <Link to='/join'>회원가입</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect(null, dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
}))(Login);
