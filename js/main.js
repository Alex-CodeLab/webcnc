
const socket = new WebSocket('ws://192.168.1.105:81');

function addData(event){
    document.getElementById("textArea").value += event;
}

socket.onopen = function(e) {
  console.log("[open] Connection established");
  socket.send("?");
};

socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);

      if (event.data instanceof Blob) {
        reader = new FileReader();
        reader.onload = () => {
            console.log("Result: " + reader.result);
            addData(reader.result);
        };
        reader.readAsText(event.data);

    }
//    else {
//        console.log("Result: " + event.data);
//    }
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error]`);
};

function sendCommand(){
    var command_str =  document.getElementById("command_msg")
    command_str.value = command_str.value.trim()
    socket.send(command_str.value);
    socket.send('\n');
    console.log(command_str.value);
}

function getCirclePart(x, y) {
  const centerX = 200; // center X coordinate of largest circle
  const centerY = 200; // center Y coordinate of largest circle
  const radii = [50, 100, 150, 200]
  const angle = Math.PI / 4; // angle of rotation (45 degrees in radians)
  const values = [0.1, 1, 10, 50];
  var ret = ""
  const distanceFromCenter = Math.sqrt((x - centerX)**2 + (y - centerY)**2);

  const rotatedX = (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle) + centerX;
  const rotatedY = (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle) + centerY;


  if (rotatedX >= centerX && rotatedY < centerY) {
    ret= "Y";
  } else if (rotatedX >= centerX && rotatedY >= centerY) {
    ret = "X";
  } else if (rotatedX < centerX && rotatedY >= centerY) {
    ret = "Y-";
  } else {
    ret = "X-";
  }

  for (let i = 0; i < radii.length ; i++) {
    if (distanceFromCenter < radii[i]) {
      return ret + values[i]
    }
  }
}




