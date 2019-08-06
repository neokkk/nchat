import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Join.scss';

const JoinPage = () => {
    const [nick, setNick] = useState(''),
          [email, setEmail] = useState(''),
          [pwd, setPwd] = useState(''),
          [pwdChk, setPwdChk] = useState(''),
          [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        console.log(nick, email, pwd, pwdChk);
        
        if (pwd !== pwdChk) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        axios.post('http://localhost:5000/auth/join', { data: { nick, email, pwd } })
             .then(result => {
                 console.log('result');
                 console.log(result);
                 setMessage(result.data.message);
             })
             .catch(err => {
                 console.log('err');
                 console.log(err);
             });

        console.log('message');
        console.log(message);
        
        location.href = '/';
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='joinPage'>
                <a href='/'><img src='../../public/images/ball.png' /></a>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='join-error'>{message}</p>
                        <Link to='/'>뒤로가기</Link>
                    </div>
                    <input type='text' onChange={e => setNick(e.target.value)} value={nick} placeholder='닉네임' required />
                    <input type='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' required />
                    <input type='password' onChange={e => setPwdChk(e.target.value)} value={pwdChk} placeholder='비밀번호 확인' required />
                    <input type='submit' value='회원가입' />
                </form>
            </div>
        </div>
    );
}

export default JoinPage;