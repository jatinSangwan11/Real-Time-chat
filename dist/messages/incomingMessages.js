import z from 'zod';
export var SupportedMessage;
(function (SupportedMessage) {
    SupportedMessage["JoinMessage"] = "JOIN_ROOM";
    SupportedMessage["SendMessage"] = "SEND_MESSAGE";
    SupportedMessage["UpvoteMessage"] = "UPVOTE_MESSAGE";
})(SupportedMessage || (SupportedMessage = {}));
export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string(),
});
export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string(),
});
export const UpvoteMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    chatId: z.string(),
});
//# sourceMappingURL=incomingMessages.js.map