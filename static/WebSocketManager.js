import { v4 as uuidv4 } from 'uuid';

/*
* Message Structure:
*
* {
*   code: codeName, 
*   body: messageBody
* }
*
*/

const webSocketManager = ()=>({
    socket : null,
    id : null,
    url : null,
    ready : false,
    init : function(data){
        this.id = data?.id || uuidv4();
        this.url = data?.url || "ws://localhost:8080";
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log("Opening WS connection...")
            this.onOpen();
        }
        this.socket.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data)
            this.onMessage(parsedMessage);
            if(data.onMessage){
                data.onMessage(parsedMessage);
            }
        }
        this.socket.onerror = (e) => {
            console.log(e);
            this.onError();
        }
        this.socket.onclose = () => {
            this.onClose();
        }
    },
    onOpen : function(){
        this.sendMessage({code:"openConnection", body : this.id});
        console.log("Connection OPEN");
        this.ready = true;
    },
    onMessage : function(message){
        console.log(message);
    },
    onError : function(){

    },
    onClose : function(){
        this.sendMessage("closeConnection",this.id);
    },
    sendMessage : function(message){
        const readyInterval = setInterval(() => {
            if(this.ready){
                this.socket.send(JSON.stringify(message));
                clearInterval(readyInterval);
            }
        }, 500);
    }
});

export default webSocketManager;