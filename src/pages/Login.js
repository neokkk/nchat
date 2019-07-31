import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState(''),
          [pwd, setPwd] = useState(''),
          [message, setMessage] = useState('');
        
    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/auth/login', { data: { email, pwd } })
             .then(result => {
                 console.log('result');
                 console.log(result);
                 setMessage('');
             })
             .catch(err => {
                 console.log('err');
                 console.log(err);
             });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='loginPage'>
                <Link to='/'><img src='../../public/images/ball.png' /></Link>
                <form onSubmit={handleSubmit}>
                    {message ? <p className='login-error'>{message}</p> : null}
                    <input type='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' required />
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