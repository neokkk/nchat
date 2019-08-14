/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import Chat from '../components/Chat';
import Header from '../components/Header';

import '../style/RoomPage.scss';

export const socket = io.connect('http://localhost:5000');

const RoomPage = props => {
    console.log('roomPAge')
    const { id, name, subname, host, limit } = props.location.state.room;
    const { user } = props;

    const [input, setInput] = useState(''),
          [inputArray, setInputArray] = useState([]);

    useEffect(() => {
        // window.addEventListener("beforeunload", () => {
        //     console.log('beforeunload')
        //   socket.emit('leave');
        // })
        socket.on('userJoin', data => {
            console.log('join data');
            console.log(data);
            setInputArray(prev => [...prev, { input: data, user: 'SYSTEM' }]);
        });

        socket.emit('join', { user: user.nick, room: id });

        socket.on('new message', data => {
            console.log('other message');
            console.log(data);
            setInputArray(prev => [...prev, { input: data.input, type: 'OTHER', user: 'o' }]);
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
            .then(() => {
                console.log('?')
                socket.emit('message', { user: { name: user.nick, input }, room: id });
                
                setInputArray(inputArray => [...inputArray, { input, type: 'MINE', user: user.nick }]);
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
                <button onClick={handleLeave}>방 나가기</button>
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

export default connect(state => ({
    user: state.user.user
}), null)(RoomPage);
