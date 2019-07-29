import React, { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('localhost:8020');

const Room = () => {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        socket.emit('new message', input);
        axios.post(`/room/id/chat`, { data: input });
    }

    return (
        <div className='Room'>
            <header>
                <img src='' />
                <span>username님</span>
                <a href='/auth/logout'>로그아웃</a>
            </header>
            <nav>
                <a href=''>방 나가기</a>
                <span>방 번호</span>
                <span>방 제목</span>
                <span>방 부제</span>
            </nav>
            <form onSubmit={handleSubmit}>
                <button><i>메뉴</i></button>
                <textarea onChange={handleChange}></textarea>
            </form>
            <main>
                <div className='others'>
                    <img />
                    <span>방장 님</span>
                    <div className='othersTalk'>안녕하세요~</div>
                </div>
                <div className='mine'>
                    <img />
                    <span>나</span>
                    <div className='myTalk'>안녕하세요! 반갑습니다~</div>
                </div>
            </main>
        </div>
    );
}

export default Room;