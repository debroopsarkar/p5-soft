let letters = new Array(26);
let letterOrder = "QWERTYUIOPASDFGHJKLZXCVBNM";
let letterOrderLowerCase = "qwertyuiopasdfghjklzxcvbnm";
let lightOnSprite;
let keyIsDown = false;
let keyDown;
let keyLight;
let blackground;
let enigma;

function preload() {
  blackground = loadImage("data/wwimage4.jpg");
  lightOnSprite = loadImage("data/download.png");
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < letters.length; i++) {
    letters[i] = new Light(letterOrder.charAt(i), i);
  }

  enigma = new Enigma();
  enigma.randomRotors();
  enigma.randomPositions();
}

function draw() {
  background(0);
  imageMode(CORNER);
  image(blackground, 0, 0, width, height);
  enigma.show();
}

function mousePressed() {
  enigma.click(mouseX, mouseY);
}

function keyPressed() {
  if (letterOrderLowerCase.indexOf(key) !== -1 && !keyIsDown && !enigma.showPlugs) {
    let output = enigma.runMachine(key);
    if (output === '1') return;

    keyLight = output;
    letters[letterOrderLowerCase.indexOf(output)].lightUp = true;
    keyIsDown = true;
    keyDown = key;
  }
}

function keyReleased() {
  if (letterOrderLowerCase.indexOf(key) !== -1 && key === keyDown) {
    letters[letterOrderLowerCase.indexOf(keyLight)].lightUp = false;
    keyIsDown = false;
  }
}

