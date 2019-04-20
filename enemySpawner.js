MyGame.enemySpawner = (function(graphics) {
  'use strict';

  let pathList = [];
  let startList = [
    {
      xCoord: 100,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 200,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 300,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 400,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 500,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 600,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 700,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 800,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 900,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },
    {
      xCoord: 1000,
      yCoord: 0,
      orientation: 4.75,
      xSpeed: 5,
      ySpeed: 5,
    },

  ];

  let lastSpawn = 0;
  let spawnIndex = 0;
  let spawnRate = 1000;
  let waveSize = 10;
  let current = 0;

  function reset(waveSize) {
    this.waveSize = waveSize;
    this.waveSize = waveSize;
  }

  function spawnFly(elapsedTime) {
    if (elapsedTime - this.lastSpawn >= this.spawnRate) {
      this.lastSpawn = elapsedTime;
      if (this.current < this.waveSize) {
        this.current++;
        if (this.spawnIndex < this.startList.length - 1) {
          this.spawnIndex++;
        } else {
          this.spawnIndex = 0;
        }
          let flyParams = {
            center: {x: this.startList[this.spawnIndex].xCoord, y: this.startList[this.spawnIndex].yCoord},
            orientation: this.startList[this.spawnIndex].orientation,
            xSpeed: this.startList[this.spawnIndex].xSpeed,
            ySpeed: this.startList[this.spawnIndex].ySpeed,
          };

        return flyParams;
      }
    }
    return false;
  }

  let api = {
      spawnFly: spawnFly,
      reset: reset,
  };

  Object.defineProperty(api, 'waveSize', {
      value: waveSize,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'current', {
      value: current,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastSpawn', {
      value: lastSpawn,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'spawnRate', {
      value: spawnRate,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'spawnIndex', {
      value: spawnIndex,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'pathList', {
      value: pathList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'startList', {
      value: startList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.graphics));
