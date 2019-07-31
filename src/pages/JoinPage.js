import React from 'react';

import '../style/JoinPage.scss';

const JoinPage = () => {
    return (
        <div className='joinPage'>
            <a href='/'><img src='../../public/images/ball.png' /></a>
            <form method='post' action='/auth/join'>
                <input type='text' name='joinNick' placeholder='닉네임' required />
                <input type='email' name='joinEmail' placeholder='이메일' required />
                <input type='password' name='joinPwd' placeholder='비밀번호' required />
                <input type='password' name='joinPwdChk' placeholder='비밀번호 확인' required />
                <input type='submit' value='회원가입' />
                <p className='join-error'>이미 등록된 회원입니다.</p>
            </form>
        </div>
    );
}

export default JoinPage;