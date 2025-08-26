import { Store, UserId, chat } from "./Store.js";
export interface Room {
    roomId: string;
    chats: chat[];
}
export declare class InMemoryStore implements Store {
    private store;
    constructor();
    initRoom(roomId: string): void;
    getChats(roomId: string, limit: number, offset: number): chat[];
    addChats(userId: UserId, name: string, message: string, roomId: string): {
        id: string;
        userId: string;
        name: string;
        message: string;
        upvotes: never[];
    } | null;
    upvote(userId: UserId, roomId: string, chatId: string): chat | null | undefined;
}
//# sourceMappingURL=inMemoryStore.d.ts.map