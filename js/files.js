
function list_files(){
    fetch('http://'+ IPADDRESS +'/upload?path=', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => display_files(text))
}


function display_files(files){
    const obj = JSON.parse(files);
    var files_div = document.getElementById('files');
    files_div.innerHTML = "";
    var files_display ='';
    for (const file in obj['files']){
      files_display +='<a href="#" class="list-group-item list-group-item-action" onclick="select_file(this)">' + obj['files'][file].name +'</a>';
    }
    files_div.innerHTML = files_display;
}
list_files();


function select_file(el){
    const selected_file = document.getElementById('selected_file');
    selected_file.value = el.innerHTML;
}