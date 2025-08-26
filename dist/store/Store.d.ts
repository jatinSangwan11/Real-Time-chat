export type UserId = string;
export interface chat {
    id: string;
    userId: UserId;
    name: string;
    message: string;
    upvotes: UserId[];
}
export declare abstract class Store {
    constructor();
    initRoom(roomId: string): void;
    getChats(room: string, limit: number, offset: number): void;
    addChats(userId: UserId, name: string, message: string, room: string): void;
    upvote(userId: UserId, room: string, chatId: string): void;
}
//# sourceMappingURL=Store.d.ts.map