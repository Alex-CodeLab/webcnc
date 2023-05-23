const IPADDRESS = '192.168.1.105'
//const IPADDRESS = document.location.host;
const socket = new  WebSocket('ws://'+ IPADDRESS +':81');

socket.onopen = function(e) {
  console.log("[open] Connection established");
};

socket.onmessage = function(event) {
      if (event.data instanceof Blob) {
        reader = new FileReader();
        reader.onload = () => {
            if (typeof handleData !== 'undefined'){
                handleData(reader.result);
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


