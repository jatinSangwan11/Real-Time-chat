// **** Example:::
// const msg: chat = {
//   userId: "user_123",
//   name: "Alice",
//   message: "Hello everyone!",
//   upvotes: ["user_456", "user_789"] // Bob and Charlie upvoted ----> here UserId is just an alias for it 
// };
export class Store {
    constructor() {
    }
    initRoom(roomId) {
    }
    getChats(room, limit, offset) {
    }
    addChats(userId, name, message, room) {
    }
    upvote(userId, room, chatId) {
    }
}
// abstract class are like interfaces like a blueprint and we cannot again cannot create an object from it , we can create the object from the class which 
// is inheriting it 
// How abstract class helps
// An abstract class defines the “contract” — what any store must be able to do, without caring how it does it.
//     *********** 
// abstract class Store {
//   abstract saveMessage(userId: string, message: string): void;
//   abstract getMessages(userId: string): string[];
// }
// Contract: Any store must implement saveMessage and getMessages.
// Implementation: Could be memory, Redis, MongoDB, or a file.
// **********************
// “These are the things any data storage class must implement, no matter how it stores the data.”
// You define the “contract”: methods like saveMessage(), getMessages(), deleteMessage() etc.
// Any class that extends this abstract class must implement these methods, whether it uses:
// A Map (in-memory)
// Redis (networked store)
// MongoDB / SQL database
// File system
//# sourceMappingURL=Store.js.map