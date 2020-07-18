const app=require("express")();
const http=require("http").createServer(app);
var counter=1;
//const path="D:/personal_projects/nodejs/chat_app/";

const path=require("path");
var io=require("socket.io")(http);
app.get("",(req,resp)=>{

    resp.sendFile(path.join(__dirname,'index.html'),(err)=>{
    });

    });

/*  when user connects with server  */

/*  when user connects with server  */

io.on('connect',(socket)=>{
   
/*  'add_user' is event which is when user sends first message  */

        socket.on('add_user',(username)=>{
            console.log("socket_id",socket.id);
            socket.username=username;
            socket.emit("message",`welcome ${username}`);
            socket.broadcast.emit('message',`${username} has joined us`);
    });
    
/*  when server receives 'is_typing' event.Here value is boolean type
which indicates whether user 'is typing' or has 'stopped typing'  */

socket.on('is_typing',({username,value})=>{
    console.log("value of typing",username,value,counter++);
    
    if(value===true){

/* 'extra' is event that displays extra message to be shown above the 'input form' element.
It contains message like 'sunil is typing' ,etc.    */

        socket.broadcast.emit('extra',`${username} is typing`);
        }
        else{
        socket.broadcast.emit('extra',null);
        }

});



/*  on receiving message */

    socket.on('message',(msg)=>{
        console.log(msg);
        
            socket.broadcast.emit('message',`${socket.username}: ${msg}`);
    });
  
/* when user disconnects */
    socket.on('disconnect',()=>{
        if(socket.username!=undefined){
            io.emit('message',`${socket.username} left`);
        }
        });
    
    
});

http.listen(process.env.PORT,()=>{
    console.log("listening on port 8000")
});
