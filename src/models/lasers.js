MyGame.lasers = (function(graphics) {
  'use strict';

  let laserList = [];

  function update() {
    let newLaserList = [];
    for (let i = 0; i < this.laserList.length; i++) {
      this.laserList[i].update();
      if (this.laserList[i].age * 30 < graphics.canvas.width * .60 && this.laserList[i].hit !== true) {
        newLaserList.push(this.laserList[i]);
      }
    }
    this.laserList = newLaserList;

  }

  function getLasersSpecs() {
    let lasersSpecs = [];
    for (let i = 0; i < this.laserList.length; i++) {
      let laserSpec = this.laserList[i].getLaserSpec();
      lasersSpecs.push(laserSpec);
    }
    return {
             specList: lasersSpecs,
             imageSrc: 'resources/laser.png',
           };
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.laserList.length; i++) {
      let laserCoord = {
        xCoord: this.laserList[i].xCoord,
        yCoord: this.laserList[i].yCoord,
        radius: this.laserList[i].width / 3,
        hit: this.laserList[i].hit,
      }
      collisionList.push(laserCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.laserList.length > 0) {
      let newLaserList = [];
      for (let i = 0; i < this.laserList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.laserList[i].xCoord && results[i].yCoord === this.laserList[i].yCoord) {
            this.laserList[i].hit = true;
          }
        }
        if (this.laserList[i].hit !== true) {
          newLaserList.push(this.laserList[i]);
        }
      }
      this.laserList = newLaserList;
    }
  }

  function addLaser(laser) {
    this.laserList.push(laser);
  }

  function createLaser(params) {
    let width = 25;
    let height = 25;

    const laserSpeed = 30;
    let age = 0;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed + laserSpeed * Math.sin(params.orientation);
    let ySpeed = params.ySpeed - laserSpeed * Math.cos(params.orientation);

    function getLaserSpec() {
      let laserSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
        age: this.age,
      };
      return laserSpecTexture;
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

    function miss() {
    }

    let api = {
        getLaserSpec: getLaserSpec,
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



    return api;
  }

  let api = {
      laserList: laserList,
      getLasersSpecs: getLasersSpecs,
      update: update,
      addLaser: addLaser,
      createLaser: createLaser,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'laserList', {
      value: laserList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.graphics));
