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
        const dictionary = {
            //code 1 => new user is connected 
            49: () => {
                console.log("new user");
                const userDiv = visualizeUser(message[1]);
                usersContainer.appendChild(userDiv);
                setTimeout(() => {
                    userDiv.classList.add("show-user-feedback");
                }, 100);
            },
            //code 2 => user is asking to play sample 
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

    //DOM MANIPULATION
    // getting app body 
    const app = document.querySelector("#app");
    const usersContainer = document.querySelector("#users-container");

    const renderStartButton = () => {
        const cover = document.createElement("div");
        cover.classList.add("cover","flex");

        const btn = document.createElement("button");
        btn.innerHTML = "START";
        btn.onclick = () => {
            cover.classList.add("hide");
            sp.play(97);
        };

        cover.appendChild(btn);
        app.appendChild(cover);
    }

    const visualizeUser = (code) => {
        const div = document.createElement("div");
        div.classList.add("user-feedback",);
        div.setAttribute("id", `sample-${code}`);
        return div;
    }

    const animateSample = (code) => {
        const el = document.querySelector(`#sample-${code}`);
        const randomY = Math.trunc(Math.random()*10)
        el.classList.add("user-feedback-animation", `color-${code}`);
        setTimeout(() => {
            el.classList.remove("user-feedback-animation", `color-${code}`);
        }, 400);
    }

    const createColorClasses = () => {
        const style = document.createElement("style");
        Object.keys(sp.samples).forEach((code,i) => {
            const color = `rgb(${Math.trunc(Math.random()*100)} ${Math.trunc(Math.random()*100)} ${Math.trunc(Math.random()*100)})`;
            style.innerHTML += `
            .color-${code}{
                background-color: ${color} !important;    
            }
            `
        });
        return style;
    }

    renderStartButton();
    document.body.appendChild(createColorClasses());
}