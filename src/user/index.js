import './style.less';
import webSocketManager from "../shared/WebSocketManager";

const wsm = webSocketManager();

window.onload = () =>{
    
    const charCode = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const SAMPLE_NUM = 13;
    const code = charCode[Math.trunc(Math.random()*SAMPLE_NUM)];

    wsm.init({
        url: "ws://192.168.1.78:3000",
        onOpen : () => {
            createInterface(code);
            wsm.sendMessage(`1${code}`);
        }
    });

    const createInterface = (code)=> {
        const app = document.querySelector("#app");
        app.appendChild(createButton(code));
    }
    const createButton = (code) => {
        const btn = document.createElement("button");
        btn.onclick = () => {wsm.sendMessage(`2${code}`)}
        return btn;
    }

}