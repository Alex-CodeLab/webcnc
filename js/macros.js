
var macros_cnf = [
     {"name": "M0", "filename": "macro0.g", },
     {"name": "M1", "filename": "macro1.g", },
     {"name": "M2", "filename": "macro2.g", },
     {"name": "M3",  "filename": "macro3.g", },
     {"name": "M4", "filename": "macro4.g", },
     {"name": "M5",  "filename": "macro5.g", } ];

function manage_macros(){

    fetch('http://'+ IPADDRESS +'/macrocfg.json', {})
    .then(response => response.text())
    .then(text => {
        // Server does not send correct HEADER info,
        // so check for valid JSON to test if file exists:
        try {
            macros_cnf = JSON.parse(text);
        } catch (e) {
//            no config found, use defaults
            macros_cnf = macros_cnf;
        }
    })
}



function display_macros(){
    const listmacros = document.getElementById('listmacros');
    var buttons_display ='';
    var button = '';
    for (let macro in macros_cnf){
            button += '<button class="btn btn-sm btn-primary m-2" onclick="select_file(\''+ macros_cnf[macro].filename + '\')" >'
            button += macros_cnf[macro].name
            button += '</button>';
            buttons_display += button;
     }
     listmacros.innerHTML = button;
}
display_macros()

let currentMacro = null;

function get_macro(id){
    currentMacro = id;
    // macros  have fixed filenames: macro0.g ... macro5.g
    const target = 'http://'+ IPADDRESS + '/SD%2fmacro'+id + '.g'
    fetch(target, {})
        .then(response => {
            if (response.headers.get('content-disposition') == 'attachment'){
                return response.text()
             }
             else {
                return '';
             }
        })
        .then(data => {
            document.getElementById("macro"+ id).textContent = data
        })

}



document.getElementById('macro_upload').addEventListener('click', handleMacroUpload);

function handleMacroUpload(){

    const formData = new FormData();
    var textAreaContent = document.getElementById('macro' + currentMacro).value;
    var blob = new Blob([textAreaContent], { type: 'text/plain' });
    var filename = 'macro' + currentMacro + '.g';
    formData.append('myfile[]', blob, filename );

    // Make a POST request to the server using Fetch API
    fetch('/upload', {
      method: 'post',
      body: formData
    })
      .then(response => {
        // Handle the response from the server
        console.log('Macro uploaded successfully');
        console.log(response);
        fileInp.value = null;

      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
}

function store_macroCnf(){
    const formData = new FormData();
    var blob = new Blob([macros_cnf], { type: 'text/plain' });
    formData.append('myfile[]', blob, 'macro2cfg.json' );

    fetch('/files', {
      method: 'post',
      body: formData
    })
      .then(response => {
              // Handle the response from the server
        console.log('Macro uploaded successfully');
        console.log(response);
        fileInp.value = null;

      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
}
