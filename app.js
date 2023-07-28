const app = require('express')();
const http = require('http').createServer(app);
const express = require('express');

app.use('/static', express.static('public'))


app.get('/', (req,res)=>{
    res.sendFile('index.html', { root: '.' })
})


const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


http.listen(8080);