/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import '../style/List.scss';
import { socket } from '../pages/RoomPage';

const List = ({ user, roomInfo, handlePassword, ...props }) => {
    const [setting, setSetting] = useState(false),
          [userCount, setUserCount] = useState(0);

    useEffect(() => { // userCount가 바뀔 때 마다 반영
        socket.on('userCountChanged', ({ roomId, userCount }) => {
            console.log(roomId, ':', userCount);
            if (roomInfo.id === roomId) setUserCount(userCount);
        });
    }, [userCount]);

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
        <Link to={{
            pathname: `/room/${roomInfo.id}`,
            state: { room: props.roomInfo }
        }}>
            <li className='list' onClick={() => handlePassword(roomInfo)}>
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
        </Link>
    );
}

export default connect(state => ({
    user: state.user.user
}), null)(List);