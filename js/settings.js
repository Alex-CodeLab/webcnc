
function activate_settings(){

    fetch('http://'+ IPADDRESS +'/command?plain=%5BESP400%5D', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => build_config(text))
}


function build_config(text){

    let res = JSON.parse(text);
    let nvs = [];
    let tree = [];
    let a = '';

    Object.entries(res['EEPROM']).forEach((item) => {

      const [key, param] = item;
//      console.log(param);
      if (param.F == 'nvs') {
        if (param.T =='S'){
            a += build_str(param)
        }
        if (param.T =='B'){
            a += build_b(param)
        }
      }
      if (param.F == 'tree') {
        tree.push(param);
      }
      // build content
      let nav  = document.getElementById('nav-flash-c')
      nav.innerHTML = a;
    });
}

function build_str(param){
    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="'+ param.P + '">'+ param.P
    t +=  '</span><input type="text" class="form-control" aria-describedby="basic-addon1" value="'+ param.V + '"></div>'
    return t
}

function build_b(param){
    let t = '';
    t += '<div class="input-group">'
    t += '<span class="input-group-text input-group-text_config" id="'+ param.P + '">'+ param.P + '</span>'
    t += '<select class="form-select">'

    Object.values(param.O).forEach((item) => {

        for (key in item){
            console.log(key, item[key]);
             t += '<option value="'+item[key]+'" >' + key + '</option>'
        }
      })

    t += '</select></div>'
    return t
}

function build_select(param){
}