import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../components/List';

import '../style/ListPage.scss'

const getList = async () => {
    const lists = await axios.get('http://localhost:5000/room/list');
    console.log('lists');
    console.log(lists.data);
}

const ListPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => { // componentDidMount
        console.log('check!');
        getList();
    }, []);
    
    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div className='listPage'>
            <nav>
                <input type='search' placeholder='채팅방 검색' />
                <button onClick={handleOpenModal}>방 만들기</button>
            </nav>
            {modalOpen && 
                <form method='post' action='/room'>
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
            }
            <List />
        </div>
    );
}

export default ListPage;