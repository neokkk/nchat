/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import Chat from '../components/Chat';
import Header from '../components/Header';

import '../style/RoomPage.scss';

const socket = io.connect('http://localhost:5000');

const RoomPage = props => {
    const { id, name, subname } = props.location.state.room;

    const [input, setInput] = useState('');
    const [inputArray, setInputArray] = useState([]);

    useEffect(() => {
        console.log('effect')
        socket.on('userJoin', data => {
            console.log('join data');
            console.log(data);
            setInputArray(prev => [...prev, { input: data.message, type: 'SYSTEM', user: null }]);
        });

        socket.emit('join', { user: { name: 'James' }, room: id });

        socket.on('new message', data => {
            console.log('other message');
            console.log(data);
            setInputArray(prev => [...prev, { input: data.input, type: 'NORMAL', user: 'OTHER' }]);
        });

        socket.emit('leave', { user: { name: 'James' }, room: id });
    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        setInputArray(inputArray => [...inputArray, { input, type: 'NORMAL', user: 'MINE' }]);

        socket.emit('message', { user: { name: 'James', input }, room: id });
        setInput('');
    }

    return (
        <div className='roomPage'>
            <Header />
            <nav>
                <Link to='/list'>방 나가기</Link>
                <div className='roomInfo'>
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>{subname}</span>
                </div>
            </nav>
            <main>
                {inputArray.map(({ type, input, user }, i) => <Chat key={i} type={type} message={input} user={user} />)}
            </main>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} value={input} placeholder='메세지를 입력하세요' />
                <button type='submit'>보내기</button>
            </form>
        </div>
    );
}

export default RoomPage;