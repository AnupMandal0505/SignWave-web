import { Socket } from "socket.io";
import { User, UserManager } from "./UserManager";

let GLOBAL_ROOM_ID = 1;

interface Room {
    user1: User,
    user2: User,
}

export class RoomManager {
    private rooms: Map<string, Room>
    private socketMapping: Map<Socket, string>
    constructor() {
        this.rooms = new Map<string, Room>()
        this.socketMapping = new Map<Socket, string>()
    }

    createRoom(user1: User, user2: User) {
        const roomId = this.generate().toString();
        this.rooms.set(roomId.toString(), {
            user1,
            user2,
        })
        this.socketMapping.set(
            user1.socket, roomId.toString())
        this.socketMapping.set(
            user2.socket, roomId.toString())

        user1.socket.emit("send-offer", {
            roomId
        })

        // user2.socket.emit("send-offer", {
        //     roomId
        // })
        console.log("Room created for " + user1.name + " and " + user2.name);
    }

    onOffer(roomId: string, sdp: string, senderSocketid: string) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser?.socket.emit("offer", {
            sdp,
            roomId
        })
    }

    onAnswer(roomId: string, sdp: string, senderSocketid: string) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;

        receivingUser?.socket.emit("answer", {
            sdp,
            roomId
        });
    }

    onIceCandidates(roomId: string, senderSocketid: string, candidate: any, type: "sender" | "receiver") {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser.socket.emit("add_ice_candidate", ({ candidate, type }));
    }

    generate() {
        return GLOBAL_ROOM_ID++;
    }

    removeRoom(socket: Socket) {
        const roomId = this.socketMapping.get(socket);
        if (!roomId) return;
        const room = this.rooms.get(roomId);
        if (!room) return;
        const receivingUser = room.user1.socket.id === socket.id ? room.user2 : room.user1;
        receivingUser.socket.emit("end");
        this.socketMapping.delete(socket);
        this.socketMapping.delete(receivingUser.socket);
        this.rooms.delete(roomId);
    }

}