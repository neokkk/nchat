import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState(''),
          [pwd, setPwd] = useState('');

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='loginPage'>
                <a href='/'><img src='../../public/images/ball.png' /></a>
                <form action='http://localhost:5000/auth/login' method='post'>
                    {/* {message ? <p className='login-error'>{message}</p> : null} */}
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

export default LoginPage;