import { server as WebSocketServer } from 'websocket';
import { SupportedMessage as outgoingSupportMessages } from './messages/outgoingMessages.js';
import http from 'http';
import { SupportedMessage } from './messages/incomingMessages.js';
import { UserManager } from './userManager.js';
import { InMemoryStore } from './store/inMemoryStore.js';
const server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
const userManager = new UserManager();
const store = new InMemoryStore();
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
function originIsAllowed(origin) {
    return true;
}
wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        // TODO : need to add rate limiting logic here
        if (message.type === 'utf8') {
            try {
                messageHandler(connection, JSON.parse(message.utf8Data));
            }
            catch (e) {
            }
            // console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
function messageHandler(ws, message) {
    if (message.type === SupportedMessage.JoinMessage) {
        const payload = message.payload;
        userManager.addUser(payload.name, payload.userId, payload.roomId, ws);
    }
    if (message.type === SupportedMessage.SendMessage) {
        const payload = message.payload;
        const user = userManager.getUser(payload.roomId, payload.userId);
        if (!user) {
            console.error("user not found in db...");
            return;
        }
        let chat = store.addChats(payload.userId, user.name, payload.message, payload.roomId);
        if (!chat) {
            console.error("chat was not added...");
            return;
        }
        // Add broadcast logic here 
        const outgoingPayload = {
            type: outgoingSupportMessages.AddChat,
            payload: {
                chatId: chat.id,
                roomId: payload.roomId,
                message: payload.message,
                name: user.name,
                upvotes: 0,
            }
        };
        userManager.broadcast(payload.roomId, payload.roomId, outgoingPayload);
    }
    if (message.type === SupportedMessage.UpvoteMessage) {
        const payload = message.payload;
        const chat = store.upvote(payload.userId, payload.roomId, payload.chatId);
        if (!chat) {
            return;
        }
        const outgoingPayload = {
            type: outgoingSupportMessages.UpdateChat,
            payload: {
                chatId: payload.chatId,
                roomId: payload.roomId,
                upvotes: chat.upvotes.length,
            }
        };
        userManager.broadcast(payload.roomId, payload.userId, outgoingPayload);
    }
}
//# sourceMappingURL=index.js.map