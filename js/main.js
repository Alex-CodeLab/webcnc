
const socket = new WebSocket('ws://192.168.1.105:81');

function addData(event){
    document.getElementById("textArea").value += event;
}

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("$");
};

function SendPrinterCommand(e, t, n, a, i, o, r) {
                t = void 0 === t || t;
                0 != e.length && (t && Monitor_output_Update("[#]" + e + "\n"),
                void 0 !== n && null != n || (n = SendPrinterCommandSuccess),
                void 0 !== a && null != a || (a = SendPrinterCommandFailed),
                e.startsWith("[ESP") || (grbl_processfn = n,
                grbl_errorfn = a,
                a = n = noop),
                e = (e = encodeURI(e)).replace("#", "%23"),
                r && (e += "&" + r),
                SendGetHttp("/command?commandText=" + e, n, a, i, o))
            }
function SendPrinterSilentCommand(e, t, n, a, i) {
                0 != e.length && (void 0 !== t && null != t || (t = SendPrinterSilentCommandSuccess),
                void 0 !== n && null != n || (n = SendPrinterCommandFailed),
                SendGetHttp("/command_silent?commandText=" + (e = (e = encodeURI(e)).replace("#", "%23")), t, n, a, i))
            }
function SendPrinterSilentCommandSuccess(e) {}
function SendPrinterCommandSuccess(e) {}
function SendPrinterCommandFailed(e, t) {
    Monitor_output_Update(0 == e ? translate_text_item("Connection error") + "\n" : translate_text_item("Error : ") + e + " :" + decode_entitie(t) + "\n"),
    console.log("printer cmd Error " + e + " :" + decode_entitie(t))
}

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