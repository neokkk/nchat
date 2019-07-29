import React from 'react';
import { Route, Link } from 'react-router-dom';

import RoomPage from '../pages/RoomPage';

const List = () => {
    return (
        <ul className='list'>
            <li>
                <div className='roomSetting'>
                    <span>채팅방 번호</span>
                    <i>설정 아이콘</i>
                </div>
                <h2 className='roomName'>채팅방 이름</h2>
                <h4 claasName='roomSubname'>채팅방 카테고리</h4>
                <div className='roomInfo'>
                    <span>랜덤 색</span>
                    <span>님 외 몇 명</span>
                    <span>4 / 4명</span>
                </div>
                <div className='roomEnter'>
                    <Link to='/room'>채팅방 입장</Link>
                    <Route path='/room' exact component={RoomPage} />
                </div>
            </li>
        </ul>
    );
}

export default List;