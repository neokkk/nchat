const SocketIO = require('socket.io');

const { User, Room, Chat } = require('./models');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server);

    app.set('io', io);

    // socket.io middleware (save in session)
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on('connection', socket => {
        console.log('socket connected!');
        let userNum = 0;
        
        socket.on('join', ({ room, user }) => {
            userNum++;

            socket.join(room);
            socket.to(room).emit('userJoin', { message: `${user.name} 님이 들어왔습니다.`, userNum });
        });

        socket.on('message', ({ room, user }) => {
            socket.to(room).emit('new message', user );
        });

        socket.on('leave', ({ room, user }) => {
            socket.leave(room);
            socket.to(room).emit('leave', `${user.name} 님이 나갔습니다.`);

            userNum--;

            if (userNum === 0) {
                setInterval(() => {
                    // 방 제거
                }, 3000);
            }
        });

        socket.on('disconnect', ({ room }) => {
            console.log('socket disconnected');
            socket.leave(room);
        });
    });
}