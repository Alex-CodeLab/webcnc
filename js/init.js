

document.addEventListener("DOMContentLoaded", () => {
  console.log("Init...");
  setTimeout(initialize, 3000);
});

function initialize(){
  if (socket.readyState === WebSocket.OPEN){
      socket.send("?");
      socket.send('$Report/Interval=50\n');  // default
  }
}

