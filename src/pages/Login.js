import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Login.scss';

const LoginPage = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='loginPage'>
                <Link to='/'><img src='../../public/images/ball.png' /></Link>
                <form method='post' action='/auth/login'>
                    <p className='login-error'>등록되지 않은 회원입니다.</p>
                    <input type='email' name='loginEmail' placeholder='이메일' required />
                    <input type='password' name='loginPwd' placeholder='비밀번호' required />
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

export default LoginPage;