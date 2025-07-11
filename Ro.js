class Rotor {
  constructor(rotorNumber, rotorPosition) {
    this.position = 0;
    this.rotorNo = rotorNumber;
    this.rotorPos = rotorPosition;
    this.setWiring(rotorNumber);
  }

  setWiring(rotorNo) {
    const wirings = [
      [[0, 15], [1, 4], [2, 25], [3, 20], [4, 14], [5, 7], [6, 23], [7, 18], [8, 2], [9, 21], [10, 5], [11, 12], [12, 19], [13, 1], [14, 6], [15, 11], [16, 17], [17, 8], [18, 13], [19, 16], [20, 9], [21, 22], [22, 0], [23, 24], [24, 3], [25, 10]],
      [[0, 25], [1, 14], [2, 20], [3, 4], [4, 18], [5, 24], [6, 3], [7, 10], [8, 5], [9, 22], [10, 15], [11, 2], [12, 8], [13, 16], [14, 23], [15, 7], [16, 12], [17, 21], [18, 1], [19, 11], [20, 6], [21, 13], [22, 9], [23, 17], [24, 0], [25, 19]],
      [[0, 4], [1, 7], [2, 17], [3, 21], [4, 23], [5, 6], [6, 0], [7, 14], [8, 1], [9, 16], [10, 20], [11, 18], [12, 8], [13, 12], [14, 25], [15, 5], [16, 11], [17, 24], [18, 13], [19, 22], [20, 10], [21, 19], [22, 15], [23, 3], [24, 9], [25, 2]],
      [[0, 8], [1, 12], [2, 4], [3, 19], [4, 2], [5, 6], [6, 5], [7, 17], [8, 0], [9, 24], [10, 18], [11, 16], [12, 1], [13, 25], [14, 23], [15, 22], [16, 11], [17, 7], [18, 10], [19, 3], [20, 21], [21, 20], [22, 15], [23, 14], [24, 9], [25, 13]],
      [[0, 16], [1, 22], [2, 4], [3, 17], [4, 19], [5, 25], [6, 20], [7, 8], [8, 14], [9, 0], [10, 18], [11, 3], [12, 5], [13, 6], [14, 7], [15, 9], [16, 10], [17, 15], [18, 24], [19, 23], [20, 2], [21, 21], [22, 1], [23, 13], [24, 12], [25, 11]]
    ];
    this.wiring = wirings[rotorNo];
  }

  runThrough(input, forward) {
    if (forward) {
      input = (input + this.position) % 26;
      return this.wiring[input][1];
    } else {
      for (let i = 0; i < 26; i++) {
        if (input === this.wiring[i][1]) {
          let output = (this.wiring[i][0] - this.position + 26) % 26;
          return output;
        }
      }
    }
    return -1;
  }

  show() {
    const x = width / 2 - ((this.rotorPos - 2) * 200);
    rectMode(CENTER);
    fill(255);
    rect(x, 200, 50, 120);
    fill(230);
    rect(x, 160, 50, 40);
    rect(x, 240, 50, 40);
    //fill(0);
    textSize(14);

    if (this.position === 0) {
      text(1, x, 160);
      text(26, x, 200);
      text(25, x, 240);
    } else if (this.position === 1) {
      text(this.position + 1, x, 160);
      text(this.position, x, 200);
      text(26, x, 240);
    } else {
      text(this.position + 1, x, 160);
      text(this.position, x, 200);
      text(this.position - 1, x, 240);
    }

    textSize(20);
    text(this.rotorNo + 1, x, 100);
  }

  click(x, y) {
    const posX = width / 2 - ((this.rotorPos - 2) * 200);
    if (x < posX + 25 && x > posX - 25 && y > 160 && y < 240) {
      this.position = (this.position + 1) % 26;
    } else if (x < posX + 25 && x > posX - 25 && y > 70 && y < 130) {
      this.nextRotor();
    }
  }

  nextRotor() {
    this.rotorNo = (this.rotorNo + 1) % 5;
    this.setWiring(this.rotorNo);
  }
}

