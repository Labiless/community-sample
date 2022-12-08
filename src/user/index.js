import webSocketManager from "../../static/WebSocketManager";

const wss = webSocketManager();
wss.init({
    url: "ws://localhost:8080"
});