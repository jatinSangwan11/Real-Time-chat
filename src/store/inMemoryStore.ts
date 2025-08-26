import { Store, UserId, chat } from "./Store.js";
let globalChatId = 0;
export interface Room {
  roomId: string;
  chats: chat[];
}
export class InMemoryStore implements Store {
  private store: Map<string, Room>;
  constructor() {
    // this.store = new Map<string,Room>() is same as this.store = new Map<string, Room> , we can omit () if there are not parameters
    this.store = new Map<string, Room>();
  }

  // initialize and empty room
  initRoom(roomId: string) {
    this.store.set(roomId, {
      roomId,
      chats: [],
    });
  }

  getChats(roomId: string, limit: number, offset: number) {
    const room = this.store.get(roomId);
    if (!room) {
      return [];
    }
    return room.chats.slice(-1 * limit - offset, -offset);
  }

  addChats(userId: UserId, name: string, message: string, roomId: string) {
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

  upvote(userId: UserId, roomId: string, chatId: string) {
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
