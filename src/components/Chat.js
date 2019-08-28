/* eslint-disable react/prop-types */
import React from 'react';

import '../style/Chat.scss';

const addZero = num => num < 10 ? '0' + num : num;

const Chat = ({ data, ...props }) => {
    const hour = new Date(data.createdAt).getHours(),
          minute = new Date(data.createdAt).getMinutes();

    return (
        <div {...props}>
        {data.user === 'SYSTEM' ?
            <p>{data.input}</p> :
            <div className={`chat ${data.type === 'OTHER' ? 'other' : 'mine'}`}>
                <span className='chatNick'>{data.user}</span>
                <div className='chatMessage'>{data.input}</div>
                <span className='chatTime'>{addZero(hour) + ':' + addZero(minute)}</span>
            </div>
        }
        </div>
    );
}

export default Chat;