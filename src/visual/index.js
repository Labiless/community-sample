import './style.less'
import SamplePlayer from "../shared/SamplePlayer";
import webSocketManager from '../shared/WebSocketManager';


const SAMPLE_ROOT = "./static/sample/"
const sp = SamplePlayer();
const wsm = webSocketManager();

window.onload = async () => {

    //websocket
    wsm.init({
        onOpen: () => { wsm.sendMessage(`0`); },  // store visual ws,
        onMessage: (message) => { onMessage(message.data.split("-")) }
    });

    //onmessage
    const onMessage = (message) => {
        console.log(message);
        const dictionary = {
            //code 1 => new user is connected 
            49: () => {
                console.log("new user");
                app.appendChild(visualizeUser(message[1]));
            },
            //code 2 => new user is connected 
            50: () => {
                animateSample(message[1]);
                sp.play(message[1]);
            },
        }
        
        dictionary[message[0]]()
    }

    // fetchin samples and create sample in sp player
    const allSamples = await fetch("http://localhost:3000/api/samplelist")
        .then(res => res.json())
        .then(data => data.samples);

    const charCode = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    allSamples.forEach((sample, i) => {
        sp.addSample(charCode[i].charCodeAt(0), SAMPLE_ROOT + sample)
    });
    console.log(sp.samples);

    //DOM MANIPULATION
    // getting app body 
    const app = document.querySelector("#app");

    let btn = document.createElement("button");
    btn.onclick = () => {sp.play("97")};
    app.appendChild(btn);

    const visualizeUser = (code) => {
        const div = document.createElement("div");
        div.classList.add("user-feedback");
        div.setAttribute("id", `sample-${code}`);
        return div;
    }

    const animateSample = (code) => {
        const el = document.querySelector(`#sample-${code}`);
        el.classList.add("user-feedback-animation");
        setTimeout(() => {
            el.classList.remove("user-feedback-animation");
        }, 100);
    }

}