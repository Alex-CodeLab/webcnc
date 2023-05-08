


function addData(event){
    let ev= event.split(/\n/);
    var textarea =  document.getElementById("log_textArea");

    var now = new Date().toLocaleTimeString('en-GB', {
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric"});
    for (e in ev){
        if (ev[e] !== ""){
            console.log(ev[e])
            textarea.value +=  now + "  " + ev[e] + "\n";

            if(textarea.selectionStart == textarea.selectionEnd) {
                textarea.scrollTop = textarea.scrollHeight;
            }
        }
    }
}

