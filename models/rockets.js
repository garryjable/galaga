MyGame.rockets = (function(graphics) {
  'use strict';

  let rocketList = [];

  function update() {
    let newRocketList = [];
    for (let i = 0; i < this.rocketList.length; i++) {
      this.rocketList[i].update(graphics.canvas.width, graphics.canvas.height);
      if (this.rocketList[i].age * 30 < graphics.canvas.width * .60 && this.rocketList[i].hit !== true) {
        newRocketList.push(this.rocketList[i]);
      }
    }
    this.rocketList = newRocketList;

  }

  function getRocketsSpecs() {
    let rocketsSpecs = [];
    for (let i = 0; i < this.rocketList.length; i++) {
      let rocketSpec = this.rocketList[i].getRocketSpec();
      rocketsSpecs.push(rocketSpec);
    }
    return {
             specList: rocketsSpecs,
             imageSrc: 'resources/rocket.png',
           };
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.rocketList.length; i++) {
      let rocketCoord = {
        xCoord: this.rocketList[i].xCoord,
        yCoord: this.rocketList[i].yCoord,
        radius: this.rocketList[i].width / 3,
        hit: this.rocketList[i].hit,
      }
      collisionList.push(rocketCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.rocketList.length > 0) {
      let newRocketList = [];
      for (let i = 0; i < this.rocketList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.rocketList[i].xCoord && results[i].yCoord === this.rocketList[i].yCoord) {
            this.rocketList[i].hit = true;
          }
        }
        if (this.rocketList[i].hit !== true) {
          newRocketList.push(this.rocketList[i]);
        }
      }
      this.rocketList = newRocketList;
    }
  }

  function addRocket(rocket) {
    this.rocketList.push(rocket);
  }

  function createRocket(params) {
    let width = 25;
    let height = 25;

    const rocketSpeed = 30;
    let age = 0;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed + rocketSpeed * Math.sin(params.orientation);
    let ySpeed = params.ySpeed - rocketSpeed * Math.cos(params.orientation);

    function getRocketSpec() {
      let rocketSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
        age: this.age,
      };
      return rocketSpecTexture;
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
        getRocketSpec: getRocketSpec,
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
      rocketList: rocketList,
      getRocketsSpecs: getRocketsSpecs,
      update: update,
      addRocket: addRocket,
      createRocket: createRocket,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'rocketList', {
      value: rocketList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.graphics));
