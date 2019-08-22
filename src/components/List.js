/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../style/List.scss';
import { socket } from '../pages/RoomPage';

const List = ({ user, roomInfo, handleEnter, ...props }) => {
    const [setting, setSetting] = useState(false),
          [restrict, setRestrict] = useState(true),
          [userCount, setUserCount] = useState(0);

    useEffect(() => { 
        socket.emit('initialUserCount');

        socket.on('userCountChanged', ({ roomId, userCount }) => {
            console.log(roomInfo);
            console.log(roomId, ':', userCount);
            if (roomInfo.id === roomId) setUserCount(userCount);
            if (roomInfo.limit === userCount) setRestrict(false);
            else setRestrict(true);
        });
    }, []);

    const handleClick = e => {
        e.preventDefault();
        setSetting(!setting);
    }

    const handleDelete = e => {
        e.preventDefault();

        axios.delete(`http://localhost:5000/room/${roomInfo.id}`);

        props.history.push('/list');        
    }

    return (
        <li className='list' onClick={() => { restrict && handleEnter(roomInfo) }}>
            <div className='listSetting'>
                <span>{roomInfo.id}</span>
                {roomInfo.host === user.nick && 
                <img onClick={handleClick} style={{ width: '20px', height: '20px' }} src='../../public/images/setting.png' />
                }
                {setting && 
                <div className='settingInfo'>
                    <a onClick={handleDelete}>삭제하기</a>
                </div>
                }
            </div>
            <h2 className='listName'>{roomInfo.name}</h2>
            <h4 className='listSubname'>{roomInfo.subname}</h4>
            <div className='listInfo'>
                <div>
                    <img src='../../public/images/crown.png' />
                    <span>{roomInfo.host} 님</span>
                </div>
                <span>{userCount} / {roomInfo.limit}명</span>
            </div>
        </li>
    );
}

export default connect(state => ({
    user: state.user.user
}), null)(List);