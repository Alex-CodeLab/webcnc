
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
      if (obj['files'][file].size == -1) {
        continue;
      }
      files_display += '<li class="list-group-item list-group-item-action">'
      files_display += '<span onclick="select_file(this)" >'+ obj['files'][file].name + '</span>'
      files_display += '<button class="btn btn-xsm btn-danger float-end" onclick="delete_file(\''
      files_display += obj['files'][file].name
      files_display += '\')">x</button>'
      files_display += '</li>'
    }
    files_div.innerHTML = files_display;
}
list_files();


function select_file(el){
//    const element = document.getElementById('selected_file');

    selected_file.value = el.textContent
}

uploadButton = document.getElementById('uploadbtn').addEventListener('click', handleUploadButtonClick);
const fileInp = document.getElementById('fileInp');
const endpoint = 'http://'+ IPADDRESS +'/upload';

function handleUploadButtonClick() {
  document.getElementById('fileInp').click();
}

document.getElementById('fileInp').addEventListener('change', handleFileInputChange);

// Function to handle file input change
function handleFileInputChange(event) {
  const file = fileInp.files[0];
  if (file) {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('myfile[]', file, file.name );
    // Make a POST request to the server using Fetch API
    fetch('/upload', {
      method: 'post',
      body: formData
    })
      .then(response => {
        // Handle the response from the server
        console.log('File uploaded successfully');
        console.log(response);
        fileInp.value = null;

        list_files();
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  }
}

function delete_file(el, path){
    var action = 'path=%2F&action=delete&filename=' + el
    fetch('http://'+ IPADDRESS +'/upload?' + action, {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.text())
       .then(text => list_files())
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

const fsuploadButton = document.getElementById('FileInputbtn');
const fileInput = document.getElementById('fileInput');
const fsendpoint = 'http://'+ IPADDRESS +'/files';

fsuploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('path', '');
        formData.append('myfiles[]', file);
        fetch(fsendpoint, {
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