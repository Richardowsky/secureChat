import "@babel/polyfill";
const http = require('http').createServer();
const io = require('socket.io')(http);

const port = 3000;

http.listen(port, () => console.log(`server listening on port: ${port}`));

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (evt) => {
        console.log(evt);
        // if(evt.message === '/start\n'){
        //     evt.message = '/Confirm starting?';
        //     socket.broadcast.emit('message', evt)
        // }


        socket.broadcast.emit('message', evt)
    })
});

io.on('disconnect', (evt) => {
    console.log('disconnected')
});
