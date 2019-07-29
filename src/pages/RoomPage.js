import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
// import io from 'socket.io-client';
import axios from 'axios';

import Header from '../components/Header';
import Chat from '../components/Chat';
import ListPage from './ListPage';

// const socket = io('localhost:8020');

const RoomPage = props => {
    console.log(props);
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`/room/id/chat`, { data: input });
    }

    return (
        <div className='roomPage'>
            <Header />
            <nav>
                <Link to='/room/list'>방 나가기</Link>
                <Route path='/room/list' exact component={ListPage} />
                <span>방 번호</span>
                <span>방 제목</span>
                <span>방 부제</span>
            </nav>
            <form onSubmit={handleSubmit}>
                <input type='file' />
                <button><i>메뉴</i></button>
                <textarea onChange={handleChange}></textarea>
            </form>
            <Chat />
        </div>
    );
}

export default RoomPage;