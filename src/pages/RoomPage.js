/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import Chat from '../components/Chat';
import Header from '../components/Header';

import '../style/RoomPage.scss';

export const socket = io.connect('http://localhost:5000');

const RoomPage = props => {
    const { id, name, subname } = props.location.state.room;
    const { user } = props;

    const [input, setInput] = useState(''),
          [inputArray, setInputArray] = useState([]);

    useEffect(() => {
        socket.on('userJoin', data => {
            setInputArray(prev => [...prev, { input: data, user: 'SYSTEM' }]);
        });

        socket.emit('join', { user: user.nick, room: id });

        socket.on('new message', data => {
            console.log(data);
            setInputArray(prev => [...prev, { input: data.user.input, type: 'OTHER', user: data.user.name, createdAt: data.room.createdAt }]);
            console.log(inputArray);
        });

        socket.on('exit', data => {
            setInputArray(prev => [...prev, { input: data, user: 'SYSTEM' }]);
        });
    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/room/${id}/chat`, { user, input })
            .then(result => {
                socket.emit('message', { user: { name: user.nick, input }, room: { id, createdAt: result.data.createdAt } });
                
                setInputArray(inputArray => [...inputArray, { input, type: 'MINE', user: user.nick, createdAt: result.data.createdAt }]);
                console.log(inputArray);
                setInput('');
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleLeave = () => {
        socket.emit('leave');
        props.history.push('/list');
    }

    return (
        <div className='roomPage'>
            <Header />
            <nav>
                <button className='roomLeave' onClick={handleLeave}>방 나가기</button>
                <div className='roomInfo'>
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>{subname}</span>
                </div>
            </nav>
            <main>
                {inputArray.map((inputData, i) => <Chat key={i} data={inputData} />)}
            </main>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} value={input} placeholder='메세지를 입력하세요' />
                <button type='submit'>보내기</button>
            </form>
        </div>
    );
}

export default connect(state => ({
    user: state.user.user
}), null)(RoomPage);
