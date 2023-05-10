

var lastMessage = "";

function addData(event){
    if(event == null){
        return
    }
    let ev= event.split(/\n/);

    var textarea =  document.getElementById("log_textArea");

    var now = new Date().toLocaleTimeString('en-GB', {
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric"});
    for (e in ev){
        if (ev[e] !== ""){
            console.log(ev[e])
            const newMessage = now + "  " + ev[e] + "\n";
            if (lastMessage !== newMessage){
//              hide repeating messages
                textarea.value +=  newMessage;
                lastMessage = newMessage;
                if(textarea.selectionStart == textarea.selectionEnd) {
                    textarea.scrollTop = textarea.scrollHeight;
                }
            }
        }
    }
}