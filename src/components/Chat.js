import React from 'react';

import '../style/Chat.scss';

const Chat = () => {
    return (
        <div className='chat other'>
            <span className='chatNick'>닉네임</span>
            <div className='chatMessage'>안녕하세요~ 반갑습니다~안녕하세요~ 반갑습니다~</div>
            <span className='chatTime'>작성 시간</span>
        </div>
    );
}

export default Chat;