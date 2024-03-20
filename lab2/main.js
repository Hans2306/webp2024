var container = document.getElementById('container');
window.onload = function() {
  if (container.textContent.length === 0) {
    generateRandomChars(1, 3); // Generate 1-3 characters if container is empty
  } else {
    generateRandomChars(0, 2); // Generate 0-2 characters if container is not empty
  }
};

window.addEventListener("keyup", function (e) {
  console.log(e.key);
  
  if (e.key == container.textContent[0]) {
    deleteFirstChar();
  } else {
    add_new_chars();
  }
});

function add_new_chars() {
  var count = container.textContent.length === 0 ? getRandomInt(1, 3) : getRandomInt(0, 2);
  for (var i = 0; i < count; i++) {
    var randomChar = generateRandomChar();
    container.textContent += randomChar;
  }
}

function deleteFirstChar() {
  var str = container.textContent;
  container.textContent = str.substring(1);
}

function generateRandomChars(min, max) {
  var count = getRandomInt(min, max);
  for (var i = 0; i < count; i++) {
    var randomChar = generateRandomChar();
    container.textContent += randomChar;
  }
}

function generateRandomChar() {
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
