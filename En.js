class Enigma {
  constructor() {
    this.rotor1 = null;
    this.rotor2 = null;
    this.rotor3 = null;
    this.end = new EndThing();
    this.plugBoard = new PlugBoard();
    this.showPlugs = false;
  }

  setRotors(first, second, third) {
    if (first !== second && first !== third && second !== third) {
      this.rotor1 = new Rotor(first, 1);
      this.rotor2 = new Rotor(second, 2);
      this.rotor3 = new Rotor(third, 3);
    }
  }

  setRotorPositions(first, second, third) {
    this.rotor1.position = first;
    this.rotor2.position = second;
    this.rotor3.position = third;
  }

  runMachine(inputChar) {
    if (
      this.rotor1.rotorNo === this.rotor2.rotorNo ||
      this.rotor3.rotorNo === this.rotor2.rotorNo ||
      this.rotor1.rotorNo === this.rotor3.rotorNo
    ) {
      console.log("Error: rotors cannot have the same number");
      return '1';
    }

    let inputNo = letterOrderLowerCase.indexOf(inputChar);
    let currentNo = inputNo;

    currentNo = this.plugBoard.runThrough(currentNo);
    currentNo = this.rotor1.runThrough(currentNo, true);
    currentNo = this.rotor2.runThrough(currentNo, true);
    currentNo = this.rotor3.runThrough(currentNo, true);
    currentNo = this.end.runThrough(currentNo, true);
    currentNo = this.rotor3.runThrough(currentNo, false);
    currentNo = this.rotor2.runThrough(currentNo, false);
    currentNo = this.rotor1.runThrough(currentNo, false);
    currentNo = this.plugBoard.runThrough(currentNo);

    if (currentNo === -1) {
      console.log(this.rotor1.position, this.rotor2.position, this.rotor3.position);
    }

    if (currentNo === inputNo) {
      console.log(inputNo, this.rotor1.position, this.rotor2.position, this.rotor3.position);
    }

    this.moveRotors();
    return letterOrderLowerCase.charAt(currentNo);
  }

  moveRotors() {
    this.rotor1.position += 1;
    if (this.rotor1.position === 26) {
      this.rotor1.position = 0;
      this.rotor2.position += 1;
      if (this.rotor2.position === 26) {
        this.rotor2.position = 0;
        this.rotor3.position += 1;
        if (this.rotor3.position === 26) {
          this.rotor3.position = 0;
        }
      }
    }
  }

  show() {
    if (!this.showPlugs) {
      stroke(0);
      for (let i = 0; i < letters.length; i++) {
        letters[i].show();
      }
      this.rotor1.show();
      this.rotor2.show();
      this.rotor3.show();

      if (
        this.rotor1.rotorNo === this.rotor2.rotorNo ||
        this.rotor3.rotorNo === this.rotor2.rotorNo ||
        this.rotor1.rotorNo === this.rotor3.rotorNo
      ) {
        fill(255, 0, 0);
        text("Cannot use the same rotor twice", width / 2, 50);
      }
    } else {
      this.plugBoard.show();
    }
  }

  randomRotors() {
    let rand1 = floor(random(5));
    let rand2 = floor(random(5));
    while (rand1 === rand2) {
      rand2 = floor(random(5));
    }

    let rand3 = floor(random(5));
    while (rand1 === rand3 || rand2 === rand3) {
      rand3 = floor(random(5));
    }

    this.setRotors(rand1, rand2, rand3);
  }

  randomPositions() {
    this.setRotorPositions(floor(random(26)), floor(random(26)), floor(random(26)));
  }

  click(x, y) {
    if (y > height * (9.0 / 10.0) && !this.plugBoard.movingPlug) {
      this.showPlugs = !this.showPlugs;
    } else {
      this.rotor1.click(x, y);
      this.rotor2.click(x, y);
      this.rotor3.click(x, y);
      this.plugBoard.click(x, y);
    }
  }

  processWord(input) {
    let output = [];
    for (let i = 0; i < input.length; i++) {
      output[i] = this.runMachine(input[i]);
    }
    return output;
  }
}

