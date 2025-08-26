let globalChatId = 0;
export class InMemoryStore {
    store;
    constructor() {
        // this.store = new Map<string,Room>() is same as this.store = new Map<string, Room> , we can omit () if there are not parameters
        this.store = new Map();
    }
    // initialize and empty room
    initRoom(roomId) {
        this.store.set(roomId, {
            roomId,
            chats: [],
        });
    }
    getChats(roomId, limit, offset) {
        const room = this.store.get(roomId);
        if (!room) {
            return [];
        }
        return room.chats.slice(-1 * limit - offset, -offset);
    }
    addChats(userId, name, message, roomId) {
        const room = this.store.get(roomId);
        if (!room) {
            return null;
        }
        const chat = {
            id: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes: [],
        };
        room.chats.push(chat);
        return chat;
    }
    upvote(userId, roomId, chatId) {
        const room = this.store.get(roomId);
        if (!room) {
            return null;
        }
        // TODO: we need to make it faster
        // concept -3
        // Since chat is a reference to the original object in room.chats, mutating chat.upvotes changes the object inside the array.
        const chat = room.chats.find(({ id }) => id === chatId);
        if (chat) {
            chat.upvotes.push(userId);
        }
        return chat;
    }
}
// | Keyword      | Use Case                                                                                                                                              | Example                                      |
// | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
// | `extends`    | Inherit from a **class** (abstract or concrete). Can inherit **methods and properties**.                                                              | `class MemoryStore extends Store { ... }`    |
// | `implements` | Implement an **interface** or **abstract class** (as a **contract**). You **must define all methods** yourself; you **don’t inherit implementation**. | `class MemoryStore implements Store { ... }` |
//# sourceMappingURL=inMemoryStore.js.map