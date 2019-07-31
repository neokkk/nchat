import React, { useRef, useEffect } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import List from '../components/List';

import '../style/ListPage.scss'

const getList = () => {
    const lists = axios.get('http://localhost:5000/room/list');
    console.log('lists');
    console.log(lists);
}

const ListPage = () => {
    const formRef = useRef();

    useEffect(() => { // componentDidMount
        getList();
    }, []);
    
    const handleMakeRoom = () => {
        formRef.current.removeAttribute('hidden');
    }

    return (
        <div className='listPage'>
            <Header />
            <nav>
                <input type='search' placeholder='채팅방 검색' />
                <button onClick={handleMakeRoom}>방 만들기</button>
            </nav>
            <form ref={formRef} method='post' action='/room' hidden>
                <div>
                    <label>
                        방 이름
                        <input type='text' name='roomName' />
                    </label>
                    <label>
                        인원수
                        <input type='number' name='roomLimit' min='2' max='10' placeholder='명' />
                    </label>
                    <label>
                        비밀번호
                        <input type='password' name='roomPwd' placeholder='설정하지 않으면 공개방' />
                    </label>
                </div>
                <button type='submit'>방 만들기</button>
            </form>
            <List />
        </div>
    );
}

export default ListPage;