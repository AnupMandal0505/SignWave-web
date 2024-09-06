import { Socket, Server } from "socket.io";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import express from 'express';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(join(__dirname, "public", "index.html"));
});
app.get('*', (req, res) => {
    return res.sendFile(join(__dirname, "public", "index.html"));
});

import { UserManager } from "./managers/UserManager";
const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
    console.log('a user connected!');
    socket.on("addUser", (name: string) => {
        console.log(`${name} has been added`)
        userManager.addUser(name, socket);
    })
    socket.on("call", (receiverName: string) => {
        console.log("call to " + receiverName)
        userManager.callUser(receiverName, socket);
    })
    socket.on("answerCall", (receiverName: string) => {
        console.log("call answer to " + receiverName)
        userManager.answerCallUser(receiverName, socket);
    })
    socket.on("rejectCall", (receiverName: string) => {
        console.log("call reject to " + receiverName)
        userManager.rejectCallUser(receiverName, socket);
    })
    socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.disconnectUser(socket);
    });
})

server.listen(80, () => {
    console.log('server running at http://localhost:80');
});