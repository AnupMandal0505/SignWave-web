import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
    socket: Socket;
    name: string;
}

export class UserManager {
    private users: User[];
    private roomManager: RoomManager;

    constructor() {
        this.users = [];
        this.roomManager = new RoomManager;
    }

    addUser(name: string, socket: Socket) {
        this.users = this.users.filter((e) => e.name != name);
        this.users.push({
            name, socket
        })
        this.initHandlers(socket);
    }

    callUser(receiverName: string, senderSocket: Socket) {
        var receiver = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return name === receiverName;
        })
        var sender = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return socket.id === senderSocket.id;
        })

        receiver?.socket.emit("call", { senderName: sender?.name });
    }

    answerCallUser(receiverName: string, senderSocket: Socket) {
        console.log("answered call");
        var receiver = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return name === receiverName;
        })
        var sender = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return socket.id === senderSocket.id;
        });

        if (!receiver || !sender) return;
        receiver?.socket.emit("lobby");
        sender?.socket.emit("lobby");

        this.roomManager.createRoom(receiver, sender);
    }

    rejectCallUser(receiverName: string, senderSocket: Socket) {
        var receiver = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return name === receiverName;
        })
        var sender = this.users.find(({ name, socket }: { name: string, socket: Socket }) => {
            return socket.id === senderSocket.id;
        });

        if (!receiver || !sender) return;
        receiver.socket.emit("rejectCall", sender.name);
    }

    initHandlers(socket: Socket) {
        socket.on("offer", ({ sdp, roomId }: { sdp: string, roomId: string }) => {
            this.roomManager.onOffer(roomId, sdp, socket.id);
        })

        socket.on("answer", ({ sdp, roomId }: { sdp: string, roomId: string }) => {
            console.log("Answer received!")
            this.roomManager.onAnswer(roomId, sdp, socket.id);
        })

        socket.on("add_ice_candidate", ({ candidate, roomId, type }) => {
            console.log(`ice-candidate with type: ${type}`)
            this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
        });
    }

    disconnectUser(socket: Socket) {
        this.roomManager.removeRoom(socket);
        this.users = this.users.filter((x) => x.socket.id != socket.id);
    }
}