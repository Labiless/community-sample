import './style.less'
import SamplePlayer from "../shared/SamplePlayer";

const SAMPLE_ROOT = "./static/sample/"

const allSamples = [
    "clap.wav",
    "kick.wav",
    "snare.wav",
    "vocal.wav"
]

const sp = SamplePlayer();
allSamples.forEach(sample => {
    sp.addSample(sample.split(".")[0], SAMPLE_ROOT+sample)
});


window.onload = () => {

    const app = document.querySelector("#app");

    const createPad = (sampleName) => {
        const btn = document.createElement("button");
        btn.classList.add("pad");
        // btn.innerHTML = sampleName;
        btn.onclick = () => {
            sp.samples[sampleName].play();
        };
        return btn;
    }

    Object.keys(sp.samples).forEach(sampleName => {
        app.appendChild(createPad(sampleName));
    })

}