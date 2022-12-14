const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const root = process.cwd();

let wss, amountOfSample;
let allSampleCode = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

    amountOfSample = fs.readdirSync(path.join(root, '/static/sample')).length;
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

    const selectSampleCode = () => {
        const sampleCode = allSampleCode[Math.trunc(Math.random()*(amountOfSample--))];
        allSampleCode = allSampleCode.replace(sampleCode, "");
        return sampleCode;
    };

    const dictionary = {
        //code 0 => visual is connected
        48: () => {allConncetion["visual"] = ws},
        //code 1 => new user is connected 
        49: () => {
            if(amountOfSample > 0){
                const sampleCode = selectSampleCode();
                sendMessage(allConncetion["visual"], `${message[0]}-${sampleCode.charCodeAt(0)}`);
                sendMessage(ws, sampleCode);
                return;
            }
        },
        //code 2 => play sample
        50: () => {
            sendMessage(allConncetion["visual"], `${message[0]}-${message[1]}`) // message[1] is sample code
        },
    }
    dictionary[message[0]]();
}

module.exports = { start };