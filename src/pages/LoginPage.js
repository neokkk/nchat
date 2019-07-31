import React from 'react';
import { Route, Link } from 'react-router-dom';

import JoinPage from './JoinPage';

import '../style/LoginPage.scss';

const LoginPage = () => {
    return (
        <div className='loginPage'>
            <a href='/'><img src='../../public/images/ball.png' /></a>
            <form method='post' action='/auth/login'>
                <p className='login-error'>등록되지 않은 회원입니다.</p>
                <input type='email' name='loginEmail' placeholder='이메일' required />
                <input type='password' name='loginPwd' placeholder='비밀번호' required />
                <input type='submit' value='로그인' />
                <div>
                    <a href=''>구글 로그인</a>
                    <a href=''>깃허브 로그인</a>
                    <Link to='/join'>회원가입</Link>
                    <Route path='/join' component={JoinPage} />
                </div>
            </form>
        </div>
    );
}

export default LoginPage;