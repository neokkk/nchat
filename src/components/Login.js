import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import '../style/Login.scss';
import * as userActions from '../store/user';

const LoginPage = ({ UserActions }) => {
    const [email, setEmail] = useState('nk@naver.com'),
          [pwd, setPwd] = useState('nkpwd'),
          [message, setMessage] = useState('');


    const handleSubmit = async e => {
        e.preventDefault();

        await axios
            .post('http://localhost:5000/auth/login', { email, pwd })
            .then(result => {
                const { user, message } = result.data;

                if (user) {
                    UserActions.loginSuccess(user);
                } else {
                    UserActions.loginFailure();
                    setMessage(message);
                }

                // return <Redirect to='/' />
            })
            .catch(err => {
                console.log('axios error');
                console.error(err);
            });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='loginPage'>
                <a href='/'><img src='../../public/images/ball.png' /></a>
                <form onSubmit={handleSubmit}>
                    {message ? <p className='login-error'>{message}</p> : null}
                    <input type='email' name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' name='pwd' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' required />
                    <input type='submit' value='로그인' />
                    <div>
                        <a href=''>구글 로그인</a>
                        <Link to='/join'>회원가입</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect(null, dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
}))(LoginPage);
