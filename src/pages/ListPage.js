import React from 'react';

import Header from '../components/Header';
import List from '../components/List';

const ListPage = () => {
    return (
        <div className='listPage'>
            <Header />
            <nav>
                <input type='search' placeholder='채팅방 검색' />
                <button>방 만들기</button>
            </nav>
            <form id='formMakeRoom'>
                <label htmlFor='roomName'>방 이름</label>
                <input type='text' name='roomName' />
                <label htmlFor='roomLimit'>인원수</label>
                <input type='number' name='roomLimit' min='2' max='10' placeholder='명' />
                <input type='checkbox' name='roomInfo' />공개방
                <input type='checkbox' name='roomInfo' />비밀방
                <label htmlFor='roomPwd' hidden>비밀번호</label>
                <input type='number' name='roomPwd' hidden />
            </form>
            <List />
        </div>
    );
}

export default ListPage;