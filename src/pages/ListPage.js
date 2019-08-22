/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import List from '../components/List';
import Header from '../components/Header';

import '../style/ListPage.scss'

const ListPage = ({ user, ...props }) => {
    const [modalOpen, setModalOpen] = useState(false),
          [list, setList] = useState(null),
          [search, setSearch] = useState(''),
          [roomName, setRoomName] = useState(''),
          [roomSubname, setRoomSubname] = useState(''),
          [roomPwd, setRoomPwd] = useState(''),
          [roomLimit, setRoomLimit] = useState(0);

    const getList = () => {
        axios
            .get('http://localhost:5000/room/list')
            .then(lists => setList(lists.data))
            .catch(err => console.error(err));
    }

    useEffect(() => { 
        console.log('check!');
        getList();
    }, []);
    
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    const handleEnter = info => {
        console.log('handle password info');
        console.log(info);

        if (info.password === null) { // 방 비밀번호가 없으면
            props.history.push({
                pathname: `/room/${info.id}`,
                state: { room: info }
            });
        } else { // 비밀번호가 있으면 검증
            const validation = prompt('비밀번호를 입력하세요');

            if (validation === info.password) {
                props.history.push({
                    pathname: `/room/${info.id}`,
                    state: { room: info }
                });
            }
        }
    }

    const handleSearch = e => {
        e.preventDefault();

        axios
            .get(`http://localhost:5000/room/search?query=${search}`)
            .then(result => setList(result.data))
            .catch(err => console.error(err));
    }

    const handleMakeRoom = e => {
        e.preventDefault();

        axios
            .post('http://localhost:5000/room', { roomName, roomSubname, roomLimit, roomPwd, user })
            .then(result => {
                props.history.push({
                    pathname: `/room/${result.data.id}`,
                    state: { room: result.data }
                });
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='listPage'>
            <Header />
            <nav>
                <form className='listSearch' onSubmit={handleSearch}>
                    <input type='search' onChange={e => setSearch(e.target.value)} value={search} placeholder='채팅방 검색' />
                </form>
                <button onClick={handleModalOpen}>방 만들기</button>
            </nav>
            {modalOpen && 
            <form className='listForm' onSubmit={handleMakeRoom}>
                <div>
                    <label>
                        방 이름
                        <input type='text' onChange={e => setRoomName(e.target.value)} required maxLength='20' />
                    </label>
                    <label>
                        카테고리
                        <input type='text' onChange={e => setRoomSubname(e.target.value)} maxLength='30' />
                    </label>
                    <label>
                        인원수
                        <input type='number' onChange={e => setRoomLimit(e.target.value)} min='2' max='10' placeholder='명' required />
                    </label>
                    <label>
                        비밀번호
                        <input type='password' onChange={e => setRoomPwd(e.target.value)} maxLength='30' placeholder='설정하지 않으면 공개방' />
                    </label>
                </div>
                <button type='submit'>방 만들기</button>
            </form>
            }
            {list ?
            <ul>
                {list.map((li, index) => (
                    <List handleEnter={handleEnter} key={index} roomInfo={li} />
                ))}
            </ul>
            :
            <h2>개설된 방이 없습니다</h2>
            }
        </div>
    );
}

export default connect(state => ({
    user: state.user.user
}), null)(ListPage);