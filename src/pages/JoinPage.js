import React from 'react';

const JoinPage = () => {
    return (
        <div className='joinPage'>
            <img src='../../public/images/ball.png' />
            <form method='post' action='/auth/join'>
                <input type='text' name='joinNick' placeholder='닉네임' />
                <input type='email' name='joinEmail' placeholder='이메일' />
                <input type='password' name='joinPwd' placeholder='비밀번호' />
                <input type='password' name='joinPwdChk' placeholder='비밀번호 확인' />
                <button>회원가입</button>
            </form>
            <p className='joinError'>이미 등록된 회원입니다.</p>
        </div>

    );
}

export default JoinPage;