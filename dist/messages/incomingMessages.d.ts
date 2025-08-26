import z from 'zod';
export declare enum SupportedMessage {
    JoinMessage = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE"
}
export type IncomingMessage = {
    type: SupportedMessage.JoinMessage;
    payload: InitMessageType;
} | {
    type: SupportedMessage.SendMessage;
    payload: UserMessageType;
} | {
    type: SupportedMessage.UpvoteMessage;
    payload: UpvoteMessageType;
};
export declare const InitMessage: z.ZodObject<{
    name: z.ZodString;
    userId: z.ZodString;
    roomId: z.ZodString;
}, z.z.core.$strip>;
export declare const UserMessage: z.ZodObject<{
    userId: z.ZodString;
    roomId: z.ZodString;
    message: z.ZodString;
}, z.z.core.$strip>;
export declare const UpvoteMessage: z.ZodObject<{
    userId: z.ZodString;
    roomId: z.ZodString;
    chatId: z.ZodString;
}, z.z.core.$strip>;
export type InitMessageType = z.infer<typeof InitMessage>;
export type UserMessageType = z.infer<typeof UserMessage>;
export type UpvoteMessageType = z.infer<typeof UpvoteMessage>;
//# sourceMappingURL=incomingMessages.d.ts.map