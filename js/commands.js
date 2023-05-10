
function sendCommand(e){
    var command_str =  document.getElementById("command_msg");
    command_str.value = command_str.value.trim();
    socket.send(command_str.value + '\n');
    console.log(command_str.value);
}

function jogCommand(event, value, axis ){
//    todo: validate input
    if(value == null){
        return
    }
    var msgstr = '$J=G91 G21 F1000 '+axis + value +'\n' ;
    socket.send(msgstr);
}

var cmd_input = document.getElementById("command_msg");

cmd_input.addEventListener("keypress", function(event) {

  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("command_msg_btn").click();
  }
});


function homing(el, axis ){
    var msgstr = '$H'+axis +'\n' ;
    socket.send(msgstr);
}


