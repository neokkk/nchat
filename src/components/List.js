import React from 'react';

const List = () => {
    return (
        <div className='List'>
            <header>
                <img src='' />
                <span><a href=''>username</a>님</span>
                <span>로그아웃</span>
            </header>
            <nav>
                <input type='search' value='채팅방 검색' />
                <button>방 만들기</button>
            </nav>
            <main>
                <ul>
                    <li>
                        <p className='roomNumber'>방 번호</p>
                        <h2 className='roomName'>방 제목</h2>
                        <h4 claasName='roomSubname'>카테고리</h4>
                        <div className='roomInfo'>
                            <img />
                            <span>님 외 몇 명</span>
                            <span>4 / 4명</span>
                        </div>
                        <div className='roomSetting'>
                            <i>설정 아이콘</i>
                            <span>채팅방 설정</span>
                        </div>
                    </li>
                </ul>
            </main>
        </div>
    );
}

export default List;