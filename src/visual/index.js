import './style.less'
import SamplePlayer from "../shared/SamplePlayer";
import webSocketManager from '../shared/WebSocketManager';


const SAMPLE_ROOT = "./static/sample/"
const sp = SamplePlayer();
const wsm = webSocketManager();

window.onload = async() => {

    //websocket
    wsm.init({
        onOpen : () => {wsm.sendMessage("a")},  // store visual ws,
        onMessage : (message) => {console.log(message);sp.play(message.data)}
    });

    // fetchin samples and create sample in sp player
    const allSamples = await fetch("http://localhost:3000/api/samplelist")
    .then(res => res.json())
    .then(data => data.samples);

    const charCode = "abcdefghijklmonpqrstuvwxyz"
    allSamples.forEach((sample,i) => {
        sp.addSample(charCode[i], SAMPLE_ROOT+sample)
    });

    // getting app body 
    const app = document.querySelector("#app");
   
    const createPad = (sampleName) => {
        const btn = document.createElement("button");
        btn.classList.add("pad");
        // btn.innerHTML = sampleName;
        btn.onclick = () => {
            sp.play(sampleName);
        };
        return btn;
    }

    Object.keys(sp.samples).forEach(sampleName => {
        app.appendChild(createPad(sampleName));
    })

}