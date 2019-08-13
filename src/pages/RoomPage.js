/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import Chat from '../components/Chat';
import Header from '../components/Header';

import '../style/RoomPage.scss';

const socket = io.connect('http://localhost:5000');

const RoomPage = props => {
    const { id, name, subname, host, limit } = props.location.state.room;
    const { user } = props;
    console.log('room user');
    console.log(user);

    const [input, setInput] = useState(''),
          [inputArray, setInputArray] = useState([]);

    useEffect(() => {
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

    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        await axios
            .post(`http://localhost:5000/room/${id}/chat`, { user, input })
            .then(result => {
                console.log('chat result');
                console.log(result);
                setInputArray(inputArray => [...inputArray, { input, type: 'MINE', user: user.nick }]);
        
                socket.emit('message', { user: { name: user.nick, input }, room: id });
                setInput('');
            })
            .catch(err => {
                console.error(err);
            });
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

export default connect(state => ({
    user: state.user.user
}), null)(RoomPage);
