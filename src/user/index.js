import webSocketManager from "../shared/WebSocketManager";

const wss = webSocketManager();
wss.init({
    url: "ws://localhost:3000"
});