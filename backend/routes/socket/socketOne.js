import express from 'express';
import { Server } from 'socket.io';


const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });
  
  let users = {};
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("join", ({ roomId }) => {
      socket.join(roomId);
      socket.roomId = roomId;
  
      if (!users[roomId]) {
        users[roomId] = [];
      }
  
      users[roomId].push(socket.id);
  
      const sockets = io.sockets.adapter.rooms.get(roomId);
      if (sockets.size === 1) {
        socket.emit("init");
      } else if (sockets.size === 2) {
        io.to(roomId).emit("ready");
      } else {
        socket.leave(roomId);
        socket.emit("full");
      }
  
      io.to(roomId).emit("users", users[roomId]);
    });
  
    socket.on("signal", (data) => {
      io.to(data.roomId).emit("desc", { desc: data.desc, sender: socket.id });
    });
  
    socket.on("disconnect", () => {
      if (socket.roomId) {
        users[socket.roomId] = users[socket.roomId].filter(id => id !== socket.id);
        io.to(socket.roomId).emit("users", users[socket.roomId]);
        if (users[socket.roomId].length === 0) {
          delete users[socket.roomId];
        }
      }
      console.log("A user disconnected:", socket.id);
    });
  });