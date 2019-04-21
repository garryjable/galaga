MyGame.saucers = (function(audio, ship, graphics) {
  'use strict';

  let saucersList = [];

  function update() {
    let newSaucerList = [];
    for (let i = 0; i < this.saucersList.length; i++) {
      this.saucersList[i].update();
      if (this.saucersList[i].hit !== true) {
        newSaucerList.push(this.saucersList[i]);
      }
    }
    this.saucersList = newSaucerList;
  }

  function fire(elapsedTime) {
    let lasersSpecs = [];
    for (let i = 0; i < this.saucersList.length; i++) {
      let laserSpec = this.saucersList[i].fire(elapsedTime);
      if (laserSpec) {
        lasersSpecs.push(laserSpec);
      }
    }
    return lasersSpecs;
  }

  function getSaucersSpecs() {
    let saucerssSpecs = [];
    for (let i = 0; i < this.saucersList.length; i++) {
      let saucersSpec = this.saucersList[i].getSaucerSpec();
      saucerssSpecs.push(saucersSpec);
    }
    return {
             specList: saucerssSpecs,
             imageSmallSrc: 'resources/william-robinson-blob-alien-explode.gif',
             imageBigSrc: 'resources/william-robinson-blob-alien-passive.gif',
           };
  }

  function spawn(level) {
    let maxSpeed = 6;
    let coinFlip = Math.floor(Math.random() * (2));
    let randOrientation = Math.random() * (graphics.cycle);
    let randTurnRate = (-graphics.cycle + Math.random() * (Math.abs(-graphics.cycle) + graphics.cycle)) / 360;
    let randXSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
    let randYSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
    let randYCoord;
    let randXCoord;
    if (coinFlip) {
      randYCoord = Math.floor(Math.random() * (graphics.canvas.height + 1));
      randXCoord = graphics.canvas.width + (graphics.canvas.buffer / 2);
    } else {
      randXCoord = Math.floor(Math.random() * (graphics.canvas.width + 1));
      randYCoord = graphics.canvas.height + (graphics.buffer / 2);
    }
    let saucersParams = {
      center: {x: randXCoord, y: randYCoord},
      orientation: randOrientation,
      turnRate: randTurnRate,
      xSpeed: randXSpeed,
      ySpeed: randYSpeed,
      size: coinFlip + 1,
    };
    return saucersParams;
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.saucersList.length; i++) {
      let saucersCoord = {
        xCoord: this.saucersList[i].xCoord,
        yCoord: this.saucersList[i].yCoord,
        radius: this.saucersList[i].width / 3,
        hit: this.saucersList[i].hit,
      }
      collisionList.push(saucersCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.saucersList.length > 0) {
      let newSaucerList = [];
      for (let i = 0; i < this.saucersList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.saucersList[i].xCoord && results[i].yCoord === this.saucersList[i].yCoord) {
            this.saucersList[i].hit = true;
          }
        }
        if (this.saucersList[i].hit !== true) {
          newSaucerList.push(this.saucersList[i]);
        } else {
          audio.playSound('resources/alien-death');
        }
      }
      this.saucersList = newSaucerList;
    }
  }

  function addSaucer(saucers) {
    this.saucersList.push(saucers);
  }

  function createSaucer(params) {
    let width = 100;
    let height = 100;
    const fireRate = 200;
    let lastShot = 0;

    let size = params.size;
    let age = 0;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed;
    let ySpeed = params.ySpeed;

    function getSaucerSpec() {
      let saucersSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width * this.size,
        height: height * this.size,
        rotation: this.orientation,
        age: this.age,
        size: this.size,
      };
      return saucersSpecTexture;
    }

    function update() {
      if (this.xSpeed > 0) {
        if (this.xCoord + this.xSpeed > graphics.canvas.width + graphics.buffer) {
          this.xCoord = 0;
        } else {
          this.xCoord = this.xCoord + this.xSpeed;
        }
      } else if (this.xSpeed < 0) {
        if (this.xCoord + this.xSpeed < 0 - graphics.buffer) {
          this.xCoord = graphics.canvas.width + graphics.buffer
        } else {
          this.xCoord = this.xCoord + this.xSpeed;
        }
      }
      if (this.ySpeed > 0) {
        if (this.yCoord + this.ySpeed > graphics.canvas.height + graphics.buffer) {
          this.yCoord = 0;
        } else {
          this.yCoord = this.yCoord + this.ySpeed;
        }
      } else if (this.ySpeed < 0) {
        if (this.yCoord + this.ySpeed < 0 - graphics.buffer) {
          this.yCoord = graphics.canvas.height + graphics.buffer
        } else {
          this.yCoord = this.yCoord + this.ySpeed;
        }
      }
      if (this.age < 100) {
        this.age++;
      }
      return;
    }

    function impact() {
    }

    function fire(elapsedTime) {
      if (elapsedTime - this.lastShot >= this.fireRate) {
        audio.playSound('resources/laser');
        this.lastShot = elapsedTime;
        let laserParams = {
          center: {x: this.xCoord, y: this.yCoord},
          orientation: Math.random() * (graphics.cycle),
          xSpeed: 0,
          ySpeed: 0,
        };
        return laserParams;
      }
      return false;
    }

    function miss() {
    }

    let api = {
        getSaucerSpec: getSaucerSpec,
        fire: fire,
        update: update,
        impact: impact,
        miss: miss,
    };

    Object.defineProperty(api, 'width', {
        value: width,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'height', {
        value: height,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'xCoord', {
        value: xCoord,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'yCoord', {
        value: yCoord,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'orientation', {
        value: orientation,
        writable: true,
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(api, 'xSpeed', {
        value: xSpeed,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'ySpeed', {
        value: ySpeed,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'age', {
        value: age,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'hit', {
        value: hit,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'lastShot', {
        value: lastShot,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'fireRate', {
        value: fireRate,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'size', {
        value: size,
        writable: true,
        enumerable: true,
        configurable: false
    });

    return api;
  }

  let api = {
      saucersList: saucersList,
      getSaucersSpecs: getSaucersSpecs,
      spawn: spawn,
      fire: fire,
      update: update,
      addSaucer: addSaucer,
      createSaucer: createSaucer,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'saucersList', {
      value: saucersList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.audio, MyGame.ship, MyGame.graphics));
