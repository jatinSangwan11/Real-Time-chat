import { connection } from "websocket";
import { OutgoingMessage } from "./messages/outgoingMessages.js";

interface user {
    name: string;
    id: string;
    conn: connection;
}
interface Room {
    users: user[];
}

export class UserManager {
    
    private rooms: Map<string,Room>
    constructor () {
        this.rooms = new Map<string,Room>()
    }

    addUser(name: string, userId: string, roomId: string, socket: connection){
        if(!this.rooms.get(roomId)){
            this.rooms.set(roomId,{
                users: []
            })
        }

        const room = this.rooms.get(roomId)
        room?.users.push({
            name,
            id: userId,
            conn : socket   // here each user is storing the live web socket connection
        })
    }

    removeUser(roomId: string, userId: string) {
        // removing the user from the room 

        const users = this.rooms.get(roomId)?.users;
        if(users) {
            this.rooms.get(roomId)!.users = users.filter(({id}) => id !== userId);
            // The difference: mutation vs reassignment GOOD TOPIC 
        }
    }

    getUser(roomId: string, userId: string): user | null {
        const users = this.rooms.get(roomId)?.users
        const user = users?.find(({id}) => id===userId)
        return user?? null;
    }

    broadcast(roomId: string,userId: string, message: OutgoingMessage) {
        
        const user = this.getUser(roomId,userId);
        if(!user) {
            console.error("user not found...")
            return;
        }

        const room = this.rooms.get(roomId);
        if(!room){
            console.error("room not found...")
            return;
        }

        room.users.forEach(({conn}) => {
            conn.sendUTF(JSON.stringify(message))
        })
    }
}