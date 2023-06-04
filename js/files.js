
function list_files(){
    fetch('http://'+ IPADDRESS +'/upload?path=', {
       headers: {
          'Accept': 'application/json'
       }
    })
       .then(response => response.json())
       .then(json => display_files(json))
}


function display_files(files){
    const obj =  files;
    var files_div = document.getElementById('files');
    files_div.innerHTML = "";
    var files_display ='';
    var macros_display = '';
    for (let file in obj['files']){
      if (obj['files'][file].size == -1) {
        continue;
      }
      var ext = obj['files'][file].name.split('.').pop();
      if (ext == 'g'){
        continue;
      }
      files_display += '<li class="list-group-item list-group-item-action">'
      files_display += '<span onclick="select_file(\'' + obj['files'][file].name + '\')" >'+ obj['files'][file].name + '</span>'
//      files_display += '<button class="btn btn-xsm btn-danger float-end" onclick="delete_file(\''
//      files_display += obj['files'][file].shortname
//      files_display += '\')">x</button>'
      files_display += '</li>'
    }
    files_div.innerHTML = files_display ;

}
list_files();


function select_file(name){
//    const element = document.getElementById('selected_file');
    selected_file.value = name
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
    var action = 'path='+ path + '&action=delete&filename=' + el ;
    var url = 'http://'+ IPADDRESS +'/files?' + encodeURI(action)
    fetch(url, {
    })
       .then(response => response.text())
       .then(text => fs_list_files())
     .catch(error => {
        console.error('Error:', error);
      });
}

var currentFolder = "/";
// FS
function fs_list_files(){
    let path = "/files?action=list&filename=all&path=" + currentFolder;
       fetch('http://'+ IPADDRESS + path, {
       headers: {
          'Accept': 'application/json'
       }
    })

  .then(response => response.json())
      .then(data => {
        let fileList = data.files;
        let folderList = [{name:'/'}];
        if (!folderList.find(o => o.name === currentFolder )){
            folderList.push({name: currentFolder });
        }
        document.getElementById('file-list').innerHTML = "";
        document.getElementById('folder-list').innerHTML = "";

        // Iterate through files and folders
        fileList.forEach(file => {
          if (file.size == -1) {
            // Add folder to folder list
            folderList.push(file);
          } else {
            // Append file row to the table
            const row = createFileRow(file);
            document.getElementById('file-list').appendChild(row);
          }
        });

        // Iterate through folders and create cards
        folderList.forEach(folder => {
          const card = createFolderCard(folder);
          document.getElementById('folder-list').appendChild(card);
        });
        let all_folders = document.getElementById("folder-list");
            for (const folder of all_folders.children) {
            folder.classList.remove('border-info');
        }
        document.getElementById(currentFolder).classList.toggle("border-info");

      })
      .catch(error => {
        console.error('Error:', error);
      });
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



 // Function to create file row
function createFileRow(file) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const sizeCell = document.createElement('td');

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    const link = document.createElement("a");
    link.setAttribute('href', file.name);
    link.textContent = file.name;
    nameCell.appendChild(link);
    sizeCell.textContent = file.size;

    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');

    // Add event listener for delete button
    deleteButton.addEventListener('click', () => {

    // Perform delete operation
    delete_file(file.name, currentFolder);
    });

    row.appendChild(nameCell);
    row.appendChild(sizeCell);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    return row;
}

// Function to create folder card
function createFolderCard(folder) {
    const card = document.createElement('div');
    card.classList.add('card','col-md-4', 'mb-4');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardIcon = document.createElement('i');
    cardIcon.classList.add('bx','bx-folder');

    const cardTitle = document.createElement('h5');
    cardTitle.textContent = folder.name;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    //      cardText.textContent = `Files: ${folder.files.length}`;
    cardText.textContent = '';

    cardBody.appendChild(cardIcon);
    cardBody.appendChild(cardTitle);
    card.appendChild(cardBody);

    card.setAttribute("id", folder.name);
    card.setAttribute("onClick", "selectfolder(this)");
    return card;
}

function selectfolder(el){
    currentFolder = el.id;
    fs_list_files();
}
