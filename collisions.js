MyGame.collisions = (function() {
    'use strict';
    function checkCollisions(rockets, ship, flies) {
      for (let j = 0; j < rockets.length; j++) {
        let xDistRocketShip = Math.abs(ship.xCoord - rockets[j].xCoord);
        let yDistRocketShip = Math.abs(ship.yCoord - rockets[j].yCoord);
        let distanceRocketShip = Math.sqrt(xDistRocketShip**2 + yDistRocketShip**2);
        if (ship.radius + rockets[j].radius >= distanceRocketShip) {
          if (ship.immortal === false) {
            ship.hit = true;
          }
        }
        for (let i = 0; i < flies.length; i++) {
          let xDistRocketFly = Math.abs(flies[i].xCoord - rockets[j].xCoord);
          let yDistRocketFly = Math.abs(flies[i].yCoord - rockets[j].yCoord);
          let distanceRocketFly = Math.sqrt(xDistRocketFly**2 + yDistRocketFly**2);
          if (flies[i].radius + rockets[j].radius >= distanceRocketFly) {
            flies[i].hit = true;
            rockets[j].hit = true;
          }
        }
      }
      return {
        rockets: rockets,
        flies: flies,
        ship: ship,
      };
    }

    let api = {
        checkCollisions: checkCollisions,
    };

    return api;
}());
