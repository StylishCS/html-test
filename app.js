const app = require('express')();
const http = require('http').createServer(app);

app.get('/', (req,res)=>{
    res.sendFile('/index.html');
})


const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

io.on('connection', socket =>{
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',message);
    })
})


http.listen(8080);