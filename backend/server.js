import http from 'http';
import connect from './database/db.js';
import app from './app.js';
import { Server } from 'socket.io';

const port = process.env.PORT || 3008;
const server = http.createServer(app);
const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/ejob";

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
    io.to(data.to).emit('callAccepted', data.signal)
  })
})




// -----------------------

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
  connect(connectionString);
});