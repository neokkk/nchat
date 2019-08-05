import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import Chat from '../components/Chat';
import Header from '../components/Header';

import '../style/RoomPage.scss';

const socket = io.connect('http://localhost:5000', { path: '/socket.io' });

const RoomPage = () => {
    const [input, setInput] = useState('');
    const [inputArray, setInputArray] = useState([]);

    useEffect(() => {
        socket.on('join', data => {
            console.log('join data');
            console.log(data);
        });
    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        setInputArray([...inputArray, input]);

        axios.post(`/room/id/chat`, { data: input });
    }

    return (
        <div className='roomPage'>
            <Header />
            <nav>
                <Link to='/list'>방 나가기</Link>
                <div className='roomInfo'>
                    <span>001</span>
                    <span>방 제목</span>
                    <span>방 부제</span>
                </div>
            </nav>
            <main>
                <p className='roomMessage'>고난 님이 입장하였습니다.</p>
                <Chat />
                <Chat />
            </main>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} placeholder='메세지를 입력하세요' />
                <button type='submit'>보내기</button>
            </form>
        </div>
    );
}

export default RoomPage;