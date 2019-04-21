MyGame.main = (function(graphics, collisions, ship, enemySpawner, rockets, flies,/*, saucers, audio*/) {
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var gameOver = false;
  var moveRate = 17;
  var level = 1;
  var levelComplete = true;

  var nextInput;
  var input = [];

  var shipSpec = ship.getShipSpec()
  var shipTexture = graphics.shipTexture(shipSpec);
  var rocketsSpecs = rockets.getRocketsSpecs()
  var rocketsTexture = graphics.rocketsTexture(rocketsSpecs);
  var fliesSpecs = flies.getFliesSpecs()
  var fliesTexture = graphics.fliesTexture(fliesSpecs);


  performance.now();
  requestAnimationFrame(gameLoop);

  function gameLoop(elapsedTime) {
    if (!gameOver) {
      if(elapsedTime - lastMoveStamp >= moveRate){
        lastMoveStamp = elapsedTime;
        processInput(elapsedTime);
        update(elapsedTime);
        render();
      }
    }
    requestAnimationFrame(gameLoop);
  }

  function processInput(elapsedTime) {
    nextInput = input.filter(onlyUnique);
    input = []
  }

  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

  function update(elapsedTime) {
    for (let i = 0; i < nextInput.length; i++) {
      if (nextInput[i] === 'startSlideLeft') {
        ship.sliding = 1;
      } else if (nextInput[i] === 'startSlideRight') {
        ship.sliding = -1;
      } else if (nextInput[i] === 'stopSlide') {
        ship.sliding = 0;
      } else if (nextInput[i] === 'fire') {
        let rocketParams = ship.fire(elapsedTime);
        if (rocketParams !== false) {
          for (let j = 0; j < rocketParams.length; j++) {
            let rocket = rockets.createRocket(rocketParams[j]);
            rockets.addRocket(rocket);
          }
        }
    }
    if (levelComplete === true) {
        levelComplete = false;
        enemySpawner.reset(10);
//  HERE SPAWN THER BUTTERS
    }
  }
  let flyParams = enemySpawner.spawnFly(elapsedTime);
  if (flyParams !== false) {
      let fly = flies.createFly(flyParams);
      flies.addFly(fly);
  }
  rockets.update();
  flies.update();
//    saucers.update();
  let results = collisions.checkCollisions(rockets.getCollisionList(), ship.getCollisionLoc(), flies.getCollisionList());
  rockets.handleCollisions(results.rockets);
  flies.handleCollisions(results.flies);
//    saucers.handleCollisions(results.saucers);
//    ship.handleCollisions(results.ship, elapsedTime);
  ship.update(elapsedTime);
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    rocketsSpecs = rockets.getRocketsSpecs();
    rocketsTexture.renderRockets(rocketsSpecs);
    rocketsTexture.draw();
    fliesSpecs = flies.getFliesSpecs();
    fliesTexture.renderFlies(fliesSpecs);
    fliesTexture.draw();
    shipSpec = ship.getShipSpec();
    shipTexture.renderShip(shipSpec);
    shipTexture.draw();
  }

  function startInput (e) {
    e = e || window.event;
    if ( e.keyCode == '37') {
      input.push('startSlideLeft');
    } else if ( e.keyCode == '39') {
      input.push('startSlideRight');
    } else if ( e.keyCode == '32') {
      input.push('fire');
    }
  }

  function stopInput (e) {
    e = e || window.event;
    if ( e.keyCode == '37') {
      input.push('stopSlide');
    } else if ( e.keyCode == '39') {
      input.push('stopSlide');
    }
  }

  document.onkeydown = startInput;
  document.onkeyup = stopInput;

}(MyGame.graphics,/* MyGame.particles,*/ MyGame.collisions, MyGame.ship, MyGame.enemySpawner, MyGame.rockets, MyGame.flies/*, MyGame.saucers, MyGame.audio*/));
