const WebSocket = require('ws');

let wss;
const allConncetion = {};

const start = (server) => {
    wss = new WebSocket.WebSocketServer({ server });
    wss.on('listening', () => {
        console.log("WS server runnig on port " + wss.address().port);
    });
    wss.on('connection', (ws) => {
        console.log("New connection request...");
        ws.on('message', (message) => onMessage(message, ws));
    });
}

const onMessage = (message, ws) => {
    messageParser(message, ws);
}

const sendMessage = (ws, message) => {
    try {
        ws.send(message);
    } catch (error) {
        console.log("error send message")
    }
}

const messageParser = (message, ws) => {

    const dictionary = {
        97: () => { allConncetion["visual"] = ws }, // a
        98: () => { sendMessage(allConncetion["visual"], "b") }, // b
        99: () => { sendMessage(allConncetion["visual"], "c") }, // c
        100: () => { sendMessage(allConncetion["visual"], "d") }, // d
        101: () => { sendMessage(allConncetion["visual"], "e") }, // e
        102: () => { sendMessage(allConncetion["visual"], "f") } // f
    }

    dictionary[message[0]]();

}

module.exports = { start };