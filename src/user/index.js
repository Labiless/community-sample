import './style.less';
import webSocketManager from "../shared/WebSocketManager";

const wsm = webSocketManager();

window.onload = () =>{

    wsm.init({
        //url: "ws://192.168.1.78:3000",
        onOpen : () => {
            wsm.sendMessage(`1`);
        },
        onMessage : (message) => {
            createInterface(message.data);
        }
    });

    const createInterface = (sampleCode)=> {
        const app = document.querySelector("#app");
        app.appendChild(createButton(sampleCode));
    }
    const createButton = (sampleCode) => {
        const btn = document.createElement("button");
        btn.onclick = (e) => {
            e.target.classList.add("button-animation");
            setTimeout(() => {
                e.target.classList.remove("button-animation");
            }, 100);
            wsm.sendMessage(`2${sampleCode}`)
        }
        return btn;
    }

}