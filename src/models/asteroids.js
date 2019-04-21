MyGame.asteroids = (function(audio, graphics) {
  'use strict';

  let asteroidList = [];

  function update() {
    for (let i = 0; i < this.asteroidList.length; i++) {
      this.asteroidList[i].update();
    }
  }

  function getAsteroidsSpecs() {
    let asteroidsSpecs = [];
    for (let i = 0; i < this.asteroidList.length; i++) {
      let asteroidSpec = this.asteroidList[i].getAsteroidSpec();
      asteroidsSpecs.push(asteroidSpec);
    }
    return {
             specList: asteroidsSpecs,
             imageLargeSrc: 'resources/asteroid-large.png',
             imageMediumSrc: 'resources/asteroid-medium.png',
             imageSmallSrc: 'resources/asteroid-small.png',
           };
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.asteroidList.length; i++) {
      let asteroidCoord = {
        xCoord: this.asteroidList[i].xCoord,
        yCoord: this.asteroidList[i].yCoord,
        radius: (this.asteroidList[i].width * this.asteroidList[i].size) / 3,
        hit: this.asteroidList[i].hit,
      }
      collisionList.push(asteroidCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.asteroidList.length > 0) {
      let newAsteroidList = [];
      for (let i = 0; i < this.asteroidList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.asteroidList[i].xCoord && results[i].yCoord === this.asteroidList[i].yCoord) {
            audio.playSound('resources/asteroid-break');
            this.asteroidList[i].hit = true;
            const maxSpeed = 6;
            if (this.asteroidList[i].size === 3) {
              for (let j = 0; j < 4; j++) {
                let randOrientation = Math.random() * (graphics.cycle);
                let randTurnRate = (-graphics.cycle + Math.random() * (Math.abs(-graphics.cycle) + graphics.cycle)) / 360;
                let randXSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
                let randYSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
                let asteroidParams = {
                  center: {x: this.asteroidList[i].xCoord, y: this.asteroidList[i].yCoord},
                  orientation: randOrientation,
                  turnRate: randTurnRate,
                  xSpeed: randXSpeed,
                  ySpeed: randYSpeed,
                  size: 2,
                };
                newAsteroidList.push(this.createAsteroid(asteroidParams));
              }
            } else if (this.asteroidList[i].size === 2) {
              for (let j = 0; j < 3; j++) {
                let randOrientation = Math.random() * (graphics.cycle);
                let randTurnRate = (-graphics.cycle + Math.random() * (Math.abs(-graphics.cycle) + graphics.cycle)) / 360;
                let randXSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
                let randYSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
                let asteroidParams = {
                  center: {x: this.asteroidList[i].xCoord, y: this.asteroidList[i].yCoord},
                  orientation: randOrientation,
                  turnRate: randTurnRate,
                  xSpeed: randXSpeed,
                  ySpeed: randYSpeed,
                  size: 1,
                };
                newAsteroidList.push(this.createAsteroid(asteroidParams));
              }
            }
          }
        }
        if (this.asteroidList[i].hit !== true) {
          newAsteroidList.push(this.asteroidList[i]);
        }
      }
      this.asteroidList = newAsteroidList;
    }
  }

  function spawn(level, size) {
    let paramList = [];
    let maxSpeed = 6;
      for (let i = 0; i < level; i++) {
        let asteroidParams;
        let coinFlip = Math.floor(Math.random() * (2));
        let randOrientation = Math.random() * (graphics.cycle);
        let randTurnRate = (-graphics.cycle + Math.random() * (Math.abs(-graphics.cycle) + graphics.cycle)) / 180;
        let randXSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
        let randYSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
        let randYCoord;
        let randXCoord;
        if (coinFlip) {
          randYCoord = Math.floor(Math.random() * (graphics.canvas.height + 1));
          randXCoord = graphics.canvas.width + (graphics.buffer / 2);
        } else {
          randXCoord = Math.floor(Math.random() * (graphics.canvas.width + 1));
          randYCoord = graphics.canvas.height + (graphics.buffer / 2);
        }
        asteroidParams = {
          center: {x: randXCoord, y: randYCoord},
          orientation: randOrientation,
          turnRate: randTurnRate,
          xSpeed: randXSpeed,
          ySpeed: randYSpeed,
          size: size,
        };
        paramList.push(asteroidParams);
      }
    return paramList;
  }

  function addAsteroids(paramList) {
    for (let i = 0; i < paramList.length; i++) {
       let asteroid = this.createAsteroid(paramList[i]);
       this.asteroidList.push(asteroid);
    }
  }

  function createAsteroid(params) {
    let width = 50;
    let height = 50;

    let size = params.size;

    let turnRate = params.turnRate;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed;
    let ySpeed = params.ySpeed;

    function getAsteroidSpec() {
      let asteroidSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: this.width * this.size,
        height: this.height * this.size,
        rotation: this.orientation,
        size: this.size,
      };
      return asteroidSpecTexture;
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
      if (this.orientation < graphics.cycle) {
        this.orientation = this.orientation + this.turnRate;
      } else {
        this.orientation = 0;
      }
      this.hit = false;

      return;
    }


    function impact() {
    }

    function miss() {
    }

    let api = {
        getAsteroidSpec: getAsteroidSpec,
        update: update,
        impact: impact,
        miss: miss,
        orientation: orientation,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
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

    Object.defineProperty(api, 'turnRate', {
        value: turnRate,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'hit', {
        value: hit,
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
      update: update,
      getAsteroidsSpecs: getAsteroidsSpecs,
      addAsteroids: addAsteroids,
      createAsteroid: createAsteroid,
      spawn: spawn,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'asteroidList', {
      value: asteroidList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.audio, MyGame.graphics));
