const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { getSender } = require('../controllers/authController');


const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
    pingTimeout:6000,
    cors:{origin:process.env.FROND_END_URL}
});


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("setup",(userData)=>{
    if(userData?.role==='Admin')
    {
      socket.join('admin')
      console.log('admin')
    }
    else{
      socket.join(userData?._id)
      console.log(userData?._id)
    }
    
    socket.emit("connected");
  })
  socket.on("join_chat",(room)=>{
    socket.join(room)
    socket.on("online",(room)=>socket.in(room).emit("online"))
    console.log("User Joined Room "+ room)
  })
  socket.on("adminRoom",()=>{
    socket.join('Admin')
    console.log('Admin room Joined in Admin')
  })
  socket.on("new_message",(newMsg)=>{
        const{content,sender,receiver,date,user}=newMsg
        //console.log(newMsg)
        socket.in(receiver===null?'admin':receiver).emit("message_recieved",{content,receiver,sender,date})
        socket.in(receiver===null?'admin':receiver).emit("senderDetails",{user,message:{content,receiver,sender,date}})
        
  })
  socket.on("typing",(room)=>socket.in(room).emit("typing"))
  socket.on("stop_typing",(room)=>socket.in(room).emit("stop_typing"))
  socket.on('isChecked',(id)=>socket.in('Admin').emit('checked',id))

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.on("offline",(room)=>socket.in(room).emit("offline"))

  });
  socket.on("connect_error", () => {
    console.log("Connection Error");

  });
});

module.exports = { app, io, server/* , getReceiverSocketId  */};
