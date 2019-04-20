MyGame.ship = (function(audio, graphics) {
  'use strict';
  const fireRate = 200;
  let lastShot = 0;
  let width = 75;
  let height = 75;
  let xCoord = graphics.canvas.width / 2;
  let yCoord = graphics.canvas.height - height;
  let orientation = 0;
  let xSpeed = 0;
  let ySpeed = 0;
  let acceleration = .5;
  let turnRate = .1;
  let sliding = 0;
  let lives = 3;
  let dead = false;
  let show = true;
  let immortal = false;
  let respawnRate = 3000;
  let flickerRate = 50;
  let lastFlicker = 0;
  let immortalTime = 6000;
  let lastDeath = 0;
  let numShips = 2;

  function getShipSpec() {
    let shipSpecTexture = {
      imageSrc: 'resources/ship.png',
      center: {x: this.xCoord, y: this.yCoord},
      width: width,
      height: height,
      show: this.show,
      rotation: this.orientation,
      numShips: this.numShips,
    };
    return shipSpecTexture;
  }

  function getCollisionLoc() {
    let shipCoord = {
      xCoord: this.xCoord,
      yCoord: this.yCoord,
      immortal: this.immortal,
      radius: this.width / 2,
    }
    return shipCoord;
  }

  function update(elapsedTime) {
    if (this.sliding > 0) {
      this.slideLeft();
    } else if (this.sliding < 0) {
      this.slideRight();
    }
    if (this.dead === true || this.immortal === true) {
      this.updateRespawn(elapsedTime);
    }
    return;
  }

  function slideLeft() {
    if (this.dead === false) {
      this.xCoord -= 5;
    }
  }

  function slideRight() {
    if (this.dead === false) {
      this.xCoord += 5;
    }
  }

  function fire(elapsedTime) {
    if (elapsedTime - this.lastShot >= this.fireRate && this.dead === false) {
      audio.playSound('resources/rocket');
      this.lastShot = elapsedTime;
      let rocketParams = {
        center: {x: this.xCoord, y: this.yCoord},
        orientation: this.orientation,
        xSpeed: this.xSpeed,
        ySpeed: this.ySpeed,
      };
      return rocketParams;
    }
    return false;
  }

  function handleCollisions(results, elapsedTime) {
    if (results.hit === true) {
      audio.playSound('resources/ship-death');
      if (this.lives > 0) {
        this.lives--;
        this.dead = true;
        this.immortal = true;
        this.show = false;
        this.lastDeath = elapsedTime;
        this.orientation = Math.random() * (graphics.cycle);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xCoord = graphics.canvas.width / 2;
        this.yCoord = graphics.canvas.height / 2;
      }
    }
  }

  function updateRespawn(elapsedTime) {
    if (elapsedTime - this.lastDeath >= this.respawnRate) {
      this.dead = false;
      if (elapsedTime - this.lastFlicker >= this.flickerRate) {
        this.lastFlicker = elapsedTime;
        this.show = !this.show;
        if (elapsedTime - this.lastDeath >= this.immortalTime) {
          this.immortal = false;
          this.show = true;
        }
      }
    }
  }

  let api = {
      getShipSpec: getShipSpec,
      update: update,
      slideRight: slideRight,
      slideLeft: slideLeft,
      getCollisionLoc: getCollisionLoc,
      handleCollisions: handleCollisions,
      updateRespawn: updateRespawn,
      fire: fire,
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

  Object.defineProperty(api, 'sliding', {
      value: sliding,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'fireRate', {
      value: fireRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastShot', {
      value: lastShot,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lives', {
      value: lives,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'dead', {
      value: dead,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'show', {
      value: show,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'immortal', {
      value: immortal,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'immortalTime', {
      value: immortalTime,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'acceleration', {
      value: acceleration,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'respawnRate', {
      value: respawnRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'flickerRate', {
      value: flickerRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastFlicker', {
      value: lastFlicker,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastDeath', {
      value: lastDeath,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'numShips', {
      value: numShips,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.audio, MyGame.graphics));
