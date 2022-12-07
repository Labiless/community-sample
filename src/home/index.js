import {printString} from "./module-test"

window.onload = () => {
    document.getElementById("app").innerHTML = `<h1>${printString("Labiles bundler")}</h1>`
}