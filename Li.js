class Light {
  constructor(letter, number) {
    this.letter = letter;
    this.number = number;
    this.lightUp = false;
    this.pos = this.calculatePosition(number);
  }

  calculatePosition(numb) {
    let level, rowPos, x, y;

    if (numb < 10) {
      level = 1;
      rowPos = numb;
      x = (rowPos + 1.0) * width / 11;
    } else if (numb < 19) {
      level = 2;
      rowPos = numb - 10;
      x = (rowPos + 1.5) * width / 11;
    } else {
      level = 3;
      rowPos = numb - 19;
      x = (rowPos + 2.0) * width / 11;
    }

    y = height / 3 + level * (height * 2 / 3) / 4;
    return createVector(x, y);
  }

  show() {
    if (this.lightUp) {
      imageMode(CENTER);
      image(lightOnSprite, this.pos.x, this.pos.y);
      fill(200, 100, 0);
    } else {
      strokeWeight(5);
      fill(150);
      ellipse(this.pos.x, this.pos.y, 80, 80);
      fill(50);
    }

    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255, 166, 49);
    text(this.letter, this.pos.x, this.pos.y);
  }
}

