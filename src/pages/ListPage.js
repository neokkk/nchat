import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import List from '../components/List';
import Header from '../components/Header';

import '../style/ListPage.scss'

const ListPage = () => {
    const [modalOpen, setModalOpen] = useState(false),
          [list, setList] = useState(null),
          [roomName, setRoomName] = useState(''),
          [roomPwd, setRoomPwd] = useState(''),
          [roomLimit, setRoomLimit] = useState(0);
    
    const getList = async () => {
        await axios.get('http://localhost:5000/room/list')
                   .then(lists => {
                        setList(lists.data);
                   });
                }

    useEffect(() => { // componentDidMount
        console.log('check!');
        getList();
    }, []);
    
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        await axios.post('http://localhost:5000/room', { data: { roomName, roomLimit, roomPwd }})
                   .then(result => {
                        <Redirect to={{ pathname: `/room/${result.data.id}` }} />
                   });
    }

    return (
        <div className='listPage'>
            <Header />
            <nav>
                <input type='search' placeholder='채팅방 검색' />
                <button onClick={handleModalOpen}>방 만들기</button>
            </nav>
            {modalOpen && 
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            방 이름
                            <input type='text' onChange={e => setRoomName(e.target.value)} required />
                        </label>
                        <label>
                            인원수
                            <input type='number' onChange={e => setRoomLimit(e.target.value)} min='2' max='10' placeholder='명' required />
                        </label>
                        <label>
                            비밀번호
                            <input type='password' onChange={e => setRoomPwd(e.target.value)} placeholder='설정하지 않으면 공개방' />
                        </label>
                    </div>
                    <button type='submit'>방 만들기</button>
                </form>
            }
            {list ?
                <ul>
                    {list.map((li, index) => (
                        <List key={index} roomInfo={li} />
                    ))}
                </ul>
                :
                <h2>개설된 방이 없습니다</h2>
            }
        </div>
    );
}

export default ListPage;