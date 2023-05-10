
const socket = new WebSocket('ws://192.168.1.105:81');

socket.onopen = function(e) {
  console.log("[open] Connection established");
};

socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);

      if (event.data instanceof Blob) {
        reader = new FileReader();
        reader.onload = () => {
            console.log("Result: " + reader.result);
            addData(reader.result);
            if (reader.result){
                const parts = reader.result.split('|');
                for (part in parts){
                   if (parts[part].startsWith('MPos')){
                       setMPositions(parts[part]);
    //                console.log(parts[part]);
                   }

                }
            }
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
