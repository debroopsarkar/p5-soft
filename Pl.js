class Plug {
  constructor(c1, c2, p1, p2) {
    this.connection1 = c1;
    this.connection2 = c2;
    this.point1 = p1;
    this.point2 = p2;
    this.move1 = false;
    this.move2 = false;
  }

  showLines() {
    stroke(255, 166, 49, 150);
    strokeWeight(3);

    if (this.move1) {
      line(mouseX, mouseY, this.point2.pos.x, this.point2.pos.y + 15);
    } else if (this.move2) {
      line(this.point1.pos.x, this.point1.pos.y + 15, mouseX, mouseY);
    } else {
      line(this.point1.pos.x, this.point1.pos.y + 15, this.point2.pos.x, this.point2.pos.y + 15);
    }
  }

  showPlugs() {
    stroke(200);
    fill(40);
    rectMode(CENTER);

    if (this.move1) {
      rect(mouseX, mouseY, 30, 70);
      rect(this.point2.pos.x, this.point2.pos.y + 15, 30, 70);
    } else if (this.move2) {
      rect(this.point1.pos.x, this.point1.pos.y + 15, 30, 70);
      rect(mouseX, mouseY, 30, 70);
    } else {
      rect(this.point1.pos.x, this.point1.pos.y + 15, 30, 70);
      rect(this.point2.pos.x, this.point2.pos.y + 15, 30, 70);
      fill(255, 88, 191);
      textSize(15);
      text(this.point2.letter, this.point1.pos.x, this.point1.pos.y + 15);
      text(this.point1.letter, this.point2.pos.x, this.point2.pos.y + 15);
    }
  }

  click(x, y) {
    if (
      x < this.point1.pos.x + 15 && x > this.point1.pos.x - 15 &&
      y < this.point1.pos.y + 50 && y > this.point1.pos.y - 20
    ) {
      this.move1 = true;
      this.point1.occupied = false;
      return true;
    } else if (
      x < this.point2.pos.x + 15 && x > this.point2.pos.x - 15 &&
      y < this.point2.pos.y + 50 && y > this.point2.pos.y - 20
    ) {
      this.move2 = true;
      this.point2.occupied = false;
      return true;
    }
    return false;
  }

  setPlugPoint(plugPointNo, newPoint, connectionNo) {
    newPoint.occupied = true;
    switch (connectionNo) {
      case 1:
        this.point1 = newPoint;
        this.connection1 = plugPointNo;
        break;
      case 2:
        this.point2 = newPoint;
        this.connection2 = plugPointNo;
        break;
    }
  }
}

