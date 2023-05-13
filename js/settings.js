
function activate_settings(){

    fetch('http://'+ IPADDRESS +'/command?plain=%5BESP400%5D', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => build_config(text))
}

function save_config(field_id, t){
    let val = 'undefined'
    if (t =='S'){
        val = document.getElementById(field_id).value;

    }
    if (t =='B'){
        var e = document.getElementById('b_'+field_id);
        val = e.options[e.selectedIndex].value;
    }
    if (t =='I'){
        val = document.getElementById('i_'+ field_id).value;
    }
    if (t =='R'){
        val = document.getElementById('i_'+ field_id).value;
    }

    if (val == 'undefined'){val =  ''}

    cmd_str = 'P%3D' + field_id + '%20T%3D' + t + '%20V%3D' + val;

    fetch('http://'+ IPADDRESS +'/command?plain=%5BESP401%5D' + cmd_str, {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text =>console.log('save config:', text))
}


function build_config(text){

    let res = JSON.parse(text);
    let nvs = '';
    let tree = '';

    Object.entries(res['EEPROM']).forEach((item) => {

      const [key, param] = item;
      if (param.F == 'nvs') {
        if (param.T =='S'){
            nvs += build_str(param)
        }
        if (param.T =='B'){
            nvs += build_b(param)
        }
        if (param.T =='I'){
            nvs += build_i(param)
        }
        if (param.T =='R'){
            nvs += build_r(param)
        }
      }
      if (param.F == 'tree') {
        if (param.T =='S'){
            tree += build_str(param)
        }
        if (param.T =='B'){
            tree += build_b(param)
        }
        if (param.T =='I'){
            tree += build_i(param)
        }
        if (param.T =='R'){
            tree += build_r(param)
        }
      }

      // set content
      let nav  = document.getElementById('nav-flash-c')
      nav.innerHTML = nvs;
      let navc  = document.getElementById('nav-config-c')
      navc.innerHTML = tree;

    });
}

function build_str(param){

    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="text_'+ param.P + '">'+ param.P
    t += '</span><input type="text" id="'+ param.P + '" class="form-control" aria-describedby="basic-addon1" value="'+ param.V + '">'
    t += '<button class="btn btn-primary" type="button" onclick="save_config(\''+ param.P + '\',\''+ param.T +'\')">Set</button>'
    t += '</div>'
    return t
}

function build_b(param){
    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="'+ param.P + '">'+ param.P + '</span>'
    t += '<select  id="b_'+ param.P + '" class="form-select">'

    Object.values(param.O).forEach((item) => {

        for (key in item){
            if (item[key] == param.V ){
                t += '<option value="'+item[key]+'" selected>' + key + '</option>'
            } else {
                t += '<option value="'+item[key]+'" >' + key + '</option>'
            }

        }
      })

    t += '</select>'
    t += '<button class="btn btn-primary" id="command_msg_btn" type="button" onclick="save_config(\''+ param.P + '\',\''+ param.T +'\')">Set</button>'
    t += '</div>'
    return t
}

function build_i(param){
    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="'+ param.P + '">'+ param.P
    t += '</span><input type="number" id="i_'+ param.P + '" class="form-control"  value="'+ param.V + '">'
    t += '<button class="btn btn-primary" id="command_msg_btn" type="button" onclick="save_config(\''+ param.P + '\',\''+ param.T +'\')">Set</button>'
    t += '</div>'
    return t ;
}

function build_r(param){
    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="'+ param.P + '">'+ param.P
    t += '</span><input type="number" step="0.01" id="i_'+ param.P + '" class="form-control"  value="'+ param.V + '">'
    t += '<button class="btn btn-primary" id="command_msg_btn" type="button" onclick="save_config(\''+ param.P + '\',\''+ param.T +'\')">Set</button>'
    t += '</div>'
    return t ;
}


function get_system_status(){
    fetch('http://'+ IPADDRESS +'/command?plain=%5BESP420%5D', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => build_stats(text))
}

function build_stats(text){
    let cardEl  = document.getElementById('nav-system-c')
    t = '<ul class="list-group">'

    const text_ = text.split(/[\r\n]+/);
    for (line in text_){
        t += '<li class="list-group-item">';
        t += text_[line] ;
        t += '</li>';
    }
    t += '</ul>'

    cardEl.innerHTML = t;
}
