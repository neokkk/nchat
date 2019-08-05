const SocketIO = require('socket.io'),
      axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, { path: '/socket.io' });

    app.set('io', io);

    const room = io.of('/room'),
          chat = io.of('/chat');

    // socket.io middleware (save in session)
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connection', socket => {
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', socket => {
        console.log('chat 네임스페이스 접속');
        const { referer } = socket.request.headers;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
            
        socket.join(roomId);
        socket.to(roomId).emit('join', {
            user: 'user',
            message: `user 님이 입장하였습니다.`
        });

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);

            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;

            if (userCount === 0) {
                axios.delete(`http://localhost:8005/room/${roomId}`)
                     .then(() => {
                         console.log('방 제거 요청 성공');
                     })
                     .catch((error) => {
                         console.error(error);
                     });
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'user',
                    message: `user 님이 퇴장하였습니다.`,
                });
            }
        });
    });
}