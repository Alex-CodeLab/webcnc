
function sendCommand(){
    var command_str =  document.getElementById("command_msg");
    command_str.value = command_str.value.trim();
    socket.send(command_str.value);
    socket.send('\n');
    console.log(command_str.value);
}

function sendCommand2(el, value, axis ){
//    todo: validate input
    var msgstr = 'G91 G21 F100 '+axis + value +'\n' ;
    socket.send(msgstr);
}

var cmd_input = document.getElementById("command_msg");


cmd_input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("command_msg_btn").click();
  }
});


function homing(el, axis ){
    var msgstr = '$H'+axis +'\n' ;
    socket.send(msgstr);
}


