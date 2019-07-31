import React from 'react';

import '../style/Header.scss';

const Header = () => {
    return (
        <header>
            <a href='/'><img src='../../public/images/ball.png' /></a>
            <div className='header-user'>
                <span>고난</span> 님
                <a href='/auth/logout'>로그아웃</a>
            </div>
        </header>
    );
}

export default Header;