
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
