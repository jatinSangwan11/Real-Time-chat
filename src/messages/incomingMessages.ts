import z from 'zod';

export enum SupportedMessage {
    JoinMessage = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE"

}

export type IncomingMessage = {
    type: SupportedMessage.JoinMessage,
    payload: InitMessageType
} | {
    type: SupportedMessage.SendMessage,
    payload: UserMessageType,
} | {
    type: SupportedMessage.UpvoteMessage,
    payload: UpvoteMessageType,
}

export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string(),
})

export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string(),
})


export const UpvoteMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    chatId: z.string(),
})

export type InitMessageType = z.infer<typeof InitMessage>

//  Here we can derive types from the zod schema
// type InitMessage = {
//     name: string;
//     userId: string;
//     roomId: string;
// }


export type UserMessageType = z.infer<typeof UserMessage>
export type UpvoteMessageType = z.infer<typeof UpvoteMessage>