


function addData(event){
    document.getElementById("textArea").value += event;
}

function sendCommand(){
    var command_str =  document.getElementById("command_msg")
    command_str.value = command_str.value.trim()
    socket.send(command_str.value);
    socket.send('\n');
    console.log(command_str.value);
}

function sendCommand2(el, value, axis ){
//    todo: validate input
    var msgstr = 'G91 G21 F100 '+axis + value +'\n' ;
    socket.send(msgstr);
}

var input = document.getElementById("command_msg");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("command_msg_btn").click();
  }
});


function sendHome(el, axis ){
    var msgstr = '$H'+axis +'\n' ;
    socket.send(msgstr);
}


