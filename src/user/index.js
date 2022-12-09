import webSocketManager from "../shared/WebSocketManager";

const wss = webSocketManager();
wss.init({
    //onOpen : () => {wss.sendMessage("b")}
});

window.onload = () =>{
    document.querySelector("#app").onclick = () => {
        wss.sendMessage("b");
    }
}