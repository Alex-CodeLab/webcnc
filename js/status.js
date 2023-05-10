
const machineStatusEl = document.getElementById('machine_status');

function displayMachineStatus(statusmsg){
    const msg = statusmsg.toLowerCase();
    if (msg == "alarm"){
        machineStatusEl.classList.remove("alert-sucess");
        machineStatusEl.classList.remove("alert-warning");
        machineStatusEl.classList.add("alert-danger");
        machineStatusEl.innerHTML = "Alarm";
        }
    if (msg == "home"){
        machineStatusEl.classList.remove("alert-danger");
        machineStatusEl.classList.remove("alert-warning");
        machineStatusEl.classList.add("alert-success");
        machineStatusEl.innerHTML = "Home";
    }
    if (msg == "idle"){
        machineStatusEl.classList.remove("alert-danger");
        machineStatusEl.classList.remove("alert-success");
        machineStatusEl.classList.add("alert-warning");
        machineStatusEl.innerHTML = "Idle";
    }
}


const WsStatusEl = document.getElementById('ws_status');

/* Check the WebSocket connection every second */
setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) {
    WsStatusEl.classList.remove("alert-danger");
    WsStatusEl.classList.add("alert-success");
  } else {
    WsStatusEl.classList.remove("alert-sucess");
    WsStatusEl.classList.add("alert-danger");
  }
}, 1000);


/* reporting on/off */
var report_input = document.getElementById("report_interval");
report_input.addEventListener("change", function(event) {
    if(this.checked) {
        socket.send('$Report/Interval=50\n');
        console.log("$Report/Interval=50");
    } else {
        socket.send('$Report/Interval=0\n');
        console.log("$Report/Interval=0");
    }
});