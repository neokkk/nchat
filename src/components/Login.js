import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState('test@gmail.com'),
          [pwd, setPwd] = useState('123');


    const handleConfirm = async () => {
        const result = await axios.post('http://localhost:5000/auth/isLoggedIn', null, {
            withCredentials: true,
        })
        console.log('result')
        console.log(result)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitResult = await axios({
            method: 'post',
            url: 'http://localhost:5000/auth/login',
            data: {
                email,
                pwd,
            },
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        
            console.log('submitResult')
            console.log(submitResult)
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='loginPage'>
                <a href='/'><img src='../../public/images/ball.png' /></a>
                <form>
                    {/* {message ? <p className='login-error'>{message}</p> : null} */}
                    <input type='email' name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' name='pwd' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' required />
                    <button onClick={handleSubmit}>로그인</button>
                    <div>
                        <a href=''>구글 로그인</a>
                        <Link to='/join'>회원가입</Link>
                    </div>
                </form>
            </div>
            <div>
                <button onClick={handleConfirm}>confirm login</button>
            </div>
        </div>
    );
}

export default LoginPage;
