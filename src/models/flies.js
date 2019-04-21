MyGame.flies = (function(graphics) {
  'use strict';

  let flyList = [];
  let pathPoints = [];

  function update() {
    for (let i = 0; i < this.flyList.length; i++) {
      this.flyList[i].update();
    }
  }

  function getFliesSpecs() {
    let fliesSpecs = [];
    for (let i = 0; i < this.flyList.length; i++) {
      let flySpec = this.flyList[i].getFlySpec();
      fliesSpecs.push(flySpec);
    }
    return {
             specList: fliesSpecs,
             imageSrc: 'resources/william-robinson-boss-bullet.gif',
           };
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.flyList.length; i++) {
      let flyCoord = {
        xCoord: this.flyList[i].xCoord,
        yCoord: this.flyList[i].yCoord,
        radius: this.flyList[i].width / 3,
        hit: this.flyList[i].hit,
      }
      collisionList.push(flyCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.flyList.length > 0) {
      let newFlyList = [];
      for (let i = 0; i < this.flyList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.flyList[i].xCoord && results[i].yCoord === this.flyList[i].yCoord) {
            this.flyList[i].hit = true;
          }
        }
        if (this.flyList[i].hit !== true) {
          newFlyList.push(this.flyList[i]);
        }
      }
      this.flyList = newFlyList;
    }
  }

  function addFly(fly) {
    this.flyList.push(fly);
  }

  function createFly(params) {
    let width = 100;
    let height = 100;

    const flySpeed = 5;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed + flySpeed * Math.sin(params.orientation);
    let ySpeed = params.ySpeed - flySpeed * Math.cos(params.orientation);

    function getFlySpec() {
      let flySpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
      };
      return flySpecTexture;
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
      return;
    }

    function changePath() {
    }

    let api = {
        getFlySpec: getFlySpec,
        update: update,
        changePath: changePath,
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

    Object.defineProperty(api, 'hit', {
        value: hit,
        writable: true,
        enumerable: true,
        configurable: false
    });

    return api;
  }

  let api = {
      getFliesSpecs: getFliesSpecs,
      update: update,
      addFly: addFly,
      createFly: createFly,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'flyList', {
      value: flyList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.graphics));
