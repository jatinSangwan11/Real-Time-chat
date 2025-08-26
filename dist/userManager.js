export class UserManager {
    rooms;
    constructor() {
        this.rooms = new Map();
    }
    addUser(name, userId, roomId, socket) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            });
        }
        const room = this.rooms.get(roomId);
        room?.users.push({
            name,
            id: userId,
            conn: socket // here each user is storing the live web socket connection
        });
    }
    removeUser(roomId, userId) {
        // removing the user from the room 
        const users = this.rooms.get(roomId)?.users;
        if (users) {
            this.rooms.get(roomId).users = users.filter(({ id }) => id !== userId);
            // The difference: mutation vs reassignment GOOD TOPIC 
        }
    }
    getUser(roomId, userId) {
        const users = this.rooms.get(roomId)?.users;
        const user = users?.find(({ id }) => id === userId);
        return user ?? null;
    }
    broadcast(roomId, userId, message) {
        const user = this.getUser(roomId, userId);
        if (!user) {
            console.error("user not found...");
            return;
        }
        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("room not found...");
            return;
        }
        room.users.forEach(({ conn }) => {
            conn.sendUTF(JSON.stringify(message));
        });
    }
}
//# sourceMappingURL=userManager.js.map