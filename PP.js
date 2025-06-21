class PlugPoint {
  constructor(no) {
    this.letterNo = no;
    this.letter = letterOrder.charAt(no);
    this.occupied = false;

    let level, rowPos, x, y;

    if (no < 10) {
      level = 1;
      rowPos = no;
      x = (rowPos + 1.0) * width / 11;
    } else if (no < 19) {
      level = 2;
      rowPos = no - 10;
      x = (rowPos + 1.5) * width / 11;
    } else {
      level = 3;
      rowPos = no - 19;
      x = (rowPos + 2.0) * width / 11;
    }

    y = height / 3 + level * (height * 2 / 3) / 4;
    if (no % 3 === 0) {
      y += 15;
    }

    this.pos = createVector(x, y);
  }

  show() {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255, 0, 0);
    text(this.letter, this.pos.x, this.pos.y - 40);

    fill(20);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, 20, 20);
    ellipse(this.pos.x, this.pos.y + 30, 20, 20);
  }

  click(x, y) {
    return (
      x < this.pos.x + 15 &&
      x > this.pos.x - 15 &&
      y < this.pos.y + 35 &&
      y > this.pos.y - 35
    );
  }
}

