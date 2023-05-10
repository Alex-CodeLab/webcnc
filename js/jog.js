
function getCirclePart(x, y) {
  const centerX = 200; // center X coordinate of largest circle
  const centerY = 200; // center Y coordinate of largest circle
  const radii = [50, 100, 150, 200]
  const angle = Math.PI / 4; // angle of rotation (45 degrees in radians)
  const values = [0.1, 1, 10, 50];
  var ret = ""
  const distanceFromCenter = Math.sqrt((x - centerX)**2 + (y - centerY)**2);

  const rotatedX = (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle) + centerX;
  const rotatedY = (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle) + centerY;


  if (rotatedX >= centerX && rotatedY < centerY) {
    ret= "Y";
  } else if (rotatedX >= centerX && rotatedY >= centerY) {
    ret = "X";
  } else if (rotatedX < centerX && rotatedY >= centerY) {
    ret = "Y-";
  } else {
    ret = "X-";
  }

  for (let i = 0; i < radii.length ; i++) {
    if (distanceFromCenter < radii[i]) {
      return ret + values[i]
    }
  }
}



document.getElementById('jog').onclick = function(e) {
      // e = Mouse click event.
      if (e.target.tagName == "A") {

          var rect = e.target.getBoundingClientRect();
          console.log(rect.top, rect.left);
          var x = e.clientX - rect.left ; //x position within the element.
          var y = e.clientY - rect.top -9;  //y position within the element.
          var p =  getCirclePart(x,y);
          jogCommand(this, p, '');
          console.log(p);
    }
}

    document.getElementById('jog').onmousemove = function(e) {
      // e = Mouse click event.
      if (e.target.tagName == "A") {
          var rect = e.target.getBoundingClientRect();
          var x = e.clientX - rect.left ; //x position within the element.
          var y = e.clientY - rect.top -9;  //y position within the element.
          var p =  getCirclePart(x,y);
          if (typeof p !== 'undefined') {
            document.getElementById('jog_help').value = p;
          }
          if (typeof p == 'undefined') {
            document.getElementById('jog_help').value = '';
          }
    }
}

