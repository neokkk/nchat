/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import '../style/List.scss';
import { socket } from '../pages/RoomPage';

const List = props => {
    const { user } = props;
    const { id, name, subname, host, limit } = props.roomInfo;

    const [setting, setSetting] = useState(false);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        socket.on('userCountChanged', ({ roomId, userCount }) => {
            console.log(roomId, ':', userCount)
            if (id === roomId) setUserCount(userCount);
        })
    }, []);
    

    const handleClick = e => {
        e.preventDefault();
        setSetting(!setting);
    }

    const handleDelete = async e => {
        e.preventDefault();

        await axios
            .delete(`http://localhost:5000/room/${id}`);

        return <Redirect to='/' />
    }

    return (
        <Link to={{
            pathname: `/room/${id}`,
            state: { room: props.roomInfo }
        }}>
            <li className='list'>
                <div className='listSetting'>
                    <span>{id}</span>
                    {host === user.nick && 
                    <img onClick={handleClick} style={{ width: '20px', height: '20px' }} src='../../public/images/setting.png' />
                    }
                    {setting && 
                    <div className='settingInfo'>
                        <a onClick={handleDelete}>삭제하기</a>
                    </div>
                    }
                </div>
                <h2 className='listName'>{name}</h2>
                <h4 className='listSubname'>{subname}</h4>
                <div className='listInfo'>
                    <div>
                        <img src='../../public/images/crown.png' />
                        <span>{host} 님</span>
                    </div>
                    <span>{userCount} / {limit}명</span>
                </div>
            </li>
        </Link>
    );
}

export default connect(state => ({
    user: state.user.user
}), null)(List);