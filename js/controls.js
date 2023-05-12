
function control_start(){
    const selected_file = document.getElementById('selected_file');

    fetch('http://'+ IPADDRESS +'/command?commandText=$SD/Run=/' + selected_file.value, {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => toggle_start())
}

function toggle_start(){
    const control_startEl = document.getElementById('control_start');
    if (control_startEl.classList.contains('active')){
        control_startEl.classList.remove('active');
    } else {
        control_startEl.classList.add('active');
    }
}


function control_pause(){

    fetch('http://'+ IPADDRESS +'/command?commandText=!' , {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => toggle_pause())
}

function control_resume(){
    fetch('http://'+ IPADDRESS +'/command?commandText=~' , {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => console.log(text))
}


function toggle_pause(){
    const control_pauseEl = document.getElementById('control_pause');
    if (control_pauseEl.classList.contains('active')){
        control_resume();
        control_pauseEl.classList.remove('active');
    } else {
        control_pauseEl.classList.add('active');
    }
}


function control_stop(){

    fetch('http://'+ IPADDRESS +'/command?commandText=%18', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => console.log(text))
}