const SocketIO = require('socket.io');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server);

    app.set('io', io);

    // socket.io middleware (save in session)
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on('connection', socket => {
        console.log('socket connected!');
        
        socket.on('join', ({ room, user }) => {
            socket.join(room);
            socket.to(room).emit('userJoin', `${user.name} joined`);
        });

        socket.on('message', ({ room, user }) => {
            socket.to(room).emit('new message', user );
        });

        socket.on('disconnect', ({ room }) => {
            console.log('socket disconnected');
            socket.leave(room);
        });
    });
}