import { connection } from "websocket";
import { OutgoingMessage } from "./messages/outgoingMessages.js";
interface user {
    name: string;
    id: string;
    conn: connection;
}
export declare class UserManager {
    private rooms;
    constructor();
    addUser(name: string, userId: string, roomId: string, socket: connection): void;
    removeUser(roomId: string, userId: string): void;
    getUser(roomId: string, userId: string): user | null;
    broadcast(roomId: string, userId: string, message: OutgoingMessage): void;
}
export {};
//# sourceMappingURL=userManager.d.ts.map