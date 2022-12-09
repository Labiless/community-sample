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
        this.url = data?.url || "ws://localhost:3000";
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log("Opening WS connection...")
            this.onOpen(data?.onOpen);
        }
        this.socket.onmessage = (message) => {
            data.onMessage(message, data?.onMessage);
        }
        this.socket.onerror = (e) => {
            console.log(e);
            this.onError();
        }
        this.socket.onclose = () => {
            this.onClose();
        }
    },
    onOpen : function(onOpen){
        if(onOpen){
            onOpen();
        }
        this.ready = true;
        console.log("Connection OPEN");
    },
    onMessage : function(message, onMessage){
        if(onMessage){
            onMessage(message);
        }
    },
    onError : function(){

    },
    onClose : function(){
        this.sendMessage("closeConnection",this.id);
    },
    sendMessage : function(message){
        this.socket.send(message);
    }
});

export default webSocketManager;