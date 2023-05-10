

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


function setMPositions(data){
    if(data == null){
        return
    }
    const mxyz = data.substring(5).split(',');
    document.getElementById("x_val_m").value = mxyz[0];
    document.getElementById("y_val_m").value = mxyz[1];
    document.getElementById("z_val_m").value = mxyz[2];
}
