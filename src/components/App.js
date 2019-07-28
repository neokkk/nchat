import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://121.254.173.45:3333');

const App = () => {
    const [input, setInput] = useState('');
    const [inputArr, setInputArr] = useState([]);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        setInputArr(prev => [...prev, input]);
        console.log(inputArr);
        socket.emit('new message', input);
    }

    useEffect(() => {
        socket.on('new message', messageObj => { // componentDidMount
            console.log(messageObj);
            setInputArr(prev => [...prev, messageObj.message]);
        }); // one time
    }, []);

    return (
        <div>
            <input type='text' onChange={handleChange}></input>
            <button onClick={handleClick}>Submit</button>
            <ul>
                {inputArr.map((input, index) => 
                    <li key={index}>{input}</li>
                )}
            </ul>
        </div>
    );
}

export default App;