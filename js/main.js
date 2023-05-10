

var lastMessage = "";

function handleData(msg){
    if(msg == null){
        return
    }
    let ev= msg.split(/\r?\n/);
    var textarea =  document.getElementById("log_textArea");
    var date_now = new Date().toLocaleTimeString('en-GB', {
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric"});
    for (e in ev){
        if (ev[e] !== ""){
            console.log(ev[e])
            const newMessage = date_now + "  " + ev[e] + "\n";
            if (lastMessage !== newMessage){
                textarea.value +=  newMessage;
                lastMessage = newMessage;
                /* update log */
                if(textarea.selectionStart == textarea.selectionEnd) {
                    textarea.scrollTop = textarea.scrollHeight;
                }

                var parts = ev[e].split('|');

                for (part in parts){
                   /* update status */
                   if (parts[part].startsWith('<')){
                            displayMachineStatus(parts[part].substring(1));
                   }
                   /* update Mpos */
                   if (parts[part].startsWith('MPos')){
                       setMPositions(parts[part]);

                   }
               }
            }
        }
    }
}
