import { WebServer } from '../je/server/index.js';

const server = new WebServer('./dist');

server.on('connection', socket => {
    console.log(socket);
});

server.listen(3000);