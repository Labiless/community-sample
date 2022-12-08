const WebSocket = require('ws');

let wss;
const allConncetion = {};

const start = (server) => {
    wss = new WebSocket.WebSocketServer({ server });
    wss.on('listening', ()=>{
        console.log("WS server runnig on port " + wss.address().port);
    });
    wss.on('connection', (ws) => {
        console.log("New connection request...");
        ws.on('message', (message) => onMessage(message, ws));
    });
}

const onMessage = (message, ws) => {
    performMessageAction(JSON.parse(message.toString()), ws);
}

const sendMessage = (ws, message) => {
    try {
        ws.send(JSON.stringify(message));
    } catch (error) {
        console.log("error send message")
    }
}

const performMessageAction = (message, ws) => {
    switch (message.code) {
        case "openConnection":
            allConncetion[message.body] = ws;
            console.log("connection extablish: " + message.body)
            sendMessage(ws, { code: "openConnection", body: "connection extablish: " + message.body });
            break;
        case "test":
            console.log("test message: " + message.body);
            sendMessage(ws, { code: "test", body: "test message" })
        case "keepAlive":
            sendMessage(allConncetion["head"], JSON.stringify(message));
            break;
        case "closeConnection":
            delete allConncetion[message];
            console.log("delete the connection: " + message);
            break;
        default:
            break;
    }
}

module.exports = { start };