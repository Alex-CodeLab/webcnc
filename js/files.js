
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
    for (let file in obj['files']){
      files_display +='<a href="#" class="list-group-item list-group-item-action" onclick="select_file(this)">' + obj['files'][file].name +'</a>';
    }
    files_div.innerHTML = files_display;
}
list_files();


function select_file(el){
    const selected_file = document.getElementById('selected_file');
    selected_file.value = el.innerHTML;
}



// FS
function fs_list_files(){
    let path = "/files?action=list&filename=all&path=/";
       fetch('http://'+ IPADDRESS + path, {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => fs_display_files(text))
}


function fs_display_files(f){
    const obj = JSON.parse(f);
    console.log(obj);
    var files_div = document.getElementById('fs');
    files_div.innerHTML = "";
    var t ='<ul class="list-group">';

    for (let file in obj['files']){
      t +='<a href="#" class="list-group-item list-group-item-action" onclick="select_file(this)">' + obj['files'][file].name +'</a>';
    }
    t += '</ul>'
    files_div.innerHTML = t;
}

const uploadButton = document.getElementById('FileInputbtn');
const fileInput = document.getElementById('fileInput');
const endpoint = 'http://'+ IPADDRESS +'/files';

uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('path', '');
        formData.append('myfiles[]', file);
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          fs_list_files();
          alert('File uploaded successfully!');
        })
        .catch(error => {
          console.error(error);
          alert('Error uploading file');
        });
      });