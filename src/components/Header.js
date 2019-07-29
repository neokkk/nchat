import React from 'react';

const Header = () => {
    return (
        <header>
            <img src='../../public/images/ball.png' />
            <span>고난 님</span>
            <a href='/auth/logout'>로그아웃</a>
        </header>
    );
}

export default Header;