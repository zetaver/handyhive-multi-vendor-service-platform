import { Server } from 'socket.io';

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  const users = new Map();

  io.on('connection', (socket) => {
    const { userId, bookingId } = socket.handshake.query;
    
    users.set(userId, socket.id);
    socket.join(bookingId);

    socket.on('message', ({ bookingId, message }) => {
      io.to(bookingId).emit('message', message);
    });

    socket.on('typing', ({ bookingId, userId }) => {
      socket.to(bookingId).emit('typing', userId);
    });

    socket.on('disconnect', () => {
      users.delete(userId);
    });
  });

  return io;
}