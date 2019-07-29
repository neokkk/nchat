import React from 'react';
import { Route, Link } from 'react-router-dom';

import JoinPage from './JoinPage';

const LoginPage = () => {
    return (
        <div className='loginPage'>
            <img src='../../public/images/ball.png' />
            <form method='post' action='/auth/login'>
                <input type='email' name='loginEmail' placeholder='이메일' />
                <input type='password' name='loginPwd' placeholder='비밀번호' />
                <button type='submit'>로그인</button>
                <Link to='/join'>회원가입</Link>
                <Route path='/join' exact component={JoinPage} />
            </form>
            <p className='loginError'>등록되지 않은 회원입니다.</p>
        </div>
    );
}

export default LoginPage;