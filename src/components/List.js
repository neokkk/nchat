import React from 'react';
import { Link } from 'react-router-dom';

import '../style/List.scss';

const List = props => {
    console.log('props');
    console.log(props);

    const handleClick = () => {
        console.log('click setting!');
    }

    return (
        <Link to='/room'>
            <li className='list'>
                <div className='listSetting'>
                    <span>001</span>
                    <img onClick={handleClick} style={{ width: '20px', height: '20px' }} src='../../public/images/setting.png' />
                </div>
                <h2 className='listName'>채팅방 이름</h2>
                <h4 className='listSubname'>채팅방 카테고리</h4>
                <div className='listInfo'>
                    <div>
                        <img></img>
                        <span>님 외 몇 명</span>
                    </div>
                    <span>4 / 4명</span>
                </div>
            </li>
        </Link>
    );
}

export default List;