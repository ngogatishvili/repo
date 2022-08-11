import {io} from "socket.io-client"


const roomBtn=document.getElementById("room-button");
const messageInput=document.getElementById("message-input");
const roomInput=document.getElementById("room-input");
const form=document.getElementById("form");
console.log(form)



const socket=io('http://localhost:3000');
const userSocket=io('http://localhost:3000/user',{auth:{token:"ehehe"}});


userSocket.on("connect_error",(err)=>{
    displayMessage(err)
})

socket.on('connect',()=>{
    displayMessage(`you are connected to this id ${socket.id}`)
    
})


socket.on("recieve-message",(message)=>{
    displayMessage(message)
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const room=roomInput.value;
    const message=messageInput.value;

    if(message==="") return;

    socket.emit("send-message",message,room);

    displayMessage(message);


    messageInput.value="";
});


roomBtn.addEventListener("click",()=>{
    const room=roomInput.value;
    socket.emit("join-room",room,message=>{
        displayMessage(message)
    });
})



const displayMessage=(message)=>{
    const div=document.createElement("div");
    div.textContent=message;
    document.getElementById("message-container").appendChild(div)

}

let count=0;
setInterval(()=>{
    socket.volatile.emit("ping",count++);
},1000)

document.addEventListener('keypress',(e)=>{
    if(e.target.matches("input")) return;

    if(e.key==="c") {
        socket.connect();
    }else if(e.key==="d") {
        socket.disconnect();
    }
})




