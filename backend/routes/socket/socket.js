import { Server } from 'socket.io';


// ----------SocketIo setup-------------
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });
  
  // --connection setup--
  io.on('connection', (socket)=>{
    socket.emit('me', socket.id)
    
    socket.on('disconnect', ()=>{
      socket.broadcast.emit("callended")
    })
  
    socket.on('callUser', ({userToCall, signalData, from, name})=>{
      io.to(userToCall).emit('callUser', {signal: signalData, from, name})
    })
  
    socket.on('answerCall', (data)=>{
      io.to(data.to).emit('callaccepted', data.signal)
    })
  })
  