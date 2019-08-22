/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Join.scss';

const Join = props => {
    const [nick, setNick] = useState(''),
          [email, setEmail] = useState(''),
          [pwd, setPwd] = useState(''),
          [pwdChk, setPwdChk] = useState(''),
          [message, setMessage] = useState('');

    const handleSubmit = async e => {
        try {
            e.preventDefault();

            if (pwd !== pwdChk) {
                setMessage('비밀번호가 일치하지 않습니다.');
                return;
            }

            await axios
                .post('http://localhost:5000/auth/join', { nick, email, pwd })
                .then(result => {
                    setMessage(result.data.message);
                    props.history.push('/');
                })
                .catch(err => {
                    console.error(err);
                });
            
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='join'>
                <Link to='/'><img src='../../public/images/ball.png' /></Link>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='join-error'>{message}</p>
                        <Link to='/'>뒤로가기</Link>
                    </div>
                    <input type='text' onChange={e => setNick(e.target.value)} value={nick} placeholder='닉네임' maxLength='10' required />
                    <input type='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='이메일' required />
                    <input type='password' onChange={e => setPwd(e.target.value)} value={pwd} placeholder='비밀번호' maxLength='20' required />
                    <input type='password' onChange={e => setPwdChk(e.target.value)} value={pwdChk} placeholder='비밀번호 확인' required />
                    <input type='submit' value='회원가입' />
                </form>
            </div>
        </div>
    );
}

export default Join;