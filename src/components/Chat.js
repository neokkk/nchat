/* eslint-disable react/prop-types */
import React from 'react';

import '../style/Chat.scss';

const Chat = ({ message, type, user }) => {
    return (
        <>
        {user === 'SYSTEM' ?
            <p>{message}</p> :
            <div className={`chat ${type === 'OTHER' ? 'other' : 'mine'}`}>
                <span className='chatNick'>{user}</span>
                <div className='chatMessage'>{message}</div>
                <span className='chatTime'>작성 시간</span>
            </div>
        }
        </>
    );
}

export default Chat;