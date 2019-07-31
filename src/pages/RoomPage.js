import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import io from 'socket.io-client';
import axios from 'axios';

import Chat from '../components/Chat';

import '../style/RoomPage.scss';

// const socket = io('localhost:8020');

const RoomPage = () => {
    const [input, setInput] = useState('');
    const [inputArray, setInputArray] = useState([]);

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
            <nav>
                <Link to='/list'>방 나가기</Link>
                <div className='room-info'>
                    <span>방 번호</span>
                    <span>방 제목</span>
                    <span>방 부제</span>
                </div>
            </nav>
            <form onSubmit={handleSubmit}>
                <input type='file' />
                <textarea onChange={handleChange}></textarea>
            </form>
            <Chat />
        </div>
    );
}

export default RoomPage;