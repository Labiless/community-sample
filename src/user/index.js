import './style.less';
import webSocketManager from "../shared/WebSocketManager";

const wss = webSocketManager();

window.onload = async() =>{
    
    // getting app body 
    const app = document.querySelector("#app");

    //web socket
    wss.init();

    // fetchin samples and create sample in sp player
    const allSamples = await fetch("http://localhost:3000/api/samplelist")
    .then(res => res.json())
    .then(data => data.samples);

    //dom managment
    const createButton = (sampleName) => {
        const btn = document.createElement("button");
        btn.onclick = () => {
            wss.sendMessage({
                code: "playSample",
                body: sampleName
            })
        };
        return btn;
    }

    //inject button
    app.appendChild(createButton(allSamples[Math.trunc(Math.random()*allSamples.length)].split(".")[0]));
}
