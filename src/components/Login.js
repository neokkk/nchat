import React from 'react';

const Login = () => {
    return (
        <form>
            <img scr='' />
            <input type='email' />
            <input type='password' />
            <buttton type='submit'>Submit</buttton>
            <p className='loginError'>error message</p>
            <a href=''>회원가입</a>
        </form>
    );
}

export default Login;