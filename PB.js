class PlugBoard {
  constructor() {
    this.plugs = new Array(10);
    this.plugPoints = new Array(26);
    this.showing = false;
    this.movingPlug = false;
    this.movingPlugNo = 0;

    for (let i = 0; i < this.plugPoints.length; i++) {
      this.plugPoints[i] = new PlugPoint(i);
    }
    this.randomisePlugs();
  }

  randomisePlugs() {
    let chosen = [];

    for (let i = 0; i < 10; i++) {
      let rand1 = floor(random(26));
      while (chosen.includes(rand1)) {
        rand1 = floor(random(26));
      }
      chosen.push(rand1);

      let rand2 = floor(random(26));
      while (chosen.includes(rand2)) {
        rand2 = floor(random(26));
      }
      chosen.push(rand2);

      this.plugs[i] = new Plug(rand1, rand2, this.plugPoints[rand1], this.plugPoints[rand2]);
      this.plugPoints[rand1].occupied = true;
      this.plugPoints[rand2].occupied = true;
    }
  }

  show() {
    for (let i = 0; i < 26; i++) {
      this.plugPoints[i].show();
    }

    for (let i = 0; i < this.plugs.length; i++) {
      this.plugs[i].showPlugs();
    }

    for (let i = 0; i < this.plugs.length; i++) {
      this.plugs[i].showLines();
    }
  }

  runThrough(input) {
    for (let i = 0; i < this.plugs.length; i++) {
      if (this.plugs[i].connection1 === input) {
        return this.plugs[i].connection2;
      } else if (this.plugs[i].connection2 === input) {
        return this.plugs[i].connection1;
      }
    }

    return input; // no plug connection, return as-is
  }

  click(x, y) {
    if (!this.movingPlug) {
      for (let i = 0; i < this.plugs.length; i++) {
        if (this.plugs[i].click(x, y)) {
          this.movingPlug = true;
          this.movingPlugNo = i;
          return;
        }
      }
    } else {
      for (let i = 0; i < this.plugPoints.length; i++) {
        if (this.plugPoints[i].click(x, y)) {
          if (!this.plugPoints[i].occupied) {
            this.movingPlug = false;
            if (this.plugs[this.movingPlugNo].move1) {
              this.plugs[this.movingPlugNo].setPlugPoint(i, this.plugPoints[i], 1);
              this.plugs[this.movingPlugNo].move1 = false;
            } else {
              this.plugs[this.movingPlugNo].setPlugPoint(i, this.plugPoints[i], 2);
              this.plugs[this.movingPlugNo].move2 = false;
            }
          }
          return;
        }
      }
    }
  }
}

