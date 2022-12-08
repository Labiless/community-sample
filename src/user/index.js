import webSocketManager from "../shared/WebSocketManager";

const wss = webSocketManager();

window.onload = () =>{
    
    //web socket
    wss.init();

}
