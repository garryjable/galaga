MyGame.collisions = (function() {
    'use strict';
    function checkCollisions(rockets, asteroids, ship, saucers) {
      for (let j = 0; j < asteroids.length; j++) {
        let xDistAstShip = Math.abs(ship.xCoord - asteroids[j].xCoord);
        let yDistAstShip = Math.abs(ship.yCoord - asteroids[j].yCoord);
        let distanceAstShip = Math.sqrt(xDistAstShip**2 + yDistAstShip**2);
        if (ship.radius + asteroids[j].radius >= distanceAstShip) {
          if (ship.immortal === false) {
            ship.hit = true;
          }
        }
        for (let i = 0; i < rockets.length; i++) {
          let xDistAstRoc = Math.abs(rockets[i].xCoord - asteroids[j].xCoord);
          let yDistAstRoc = Math.abs(rockets[i].yCoord - asteroids[j].yCoord);
          let distanceAstRoc = Math.sqrt(xDistAstRoc**2 + yDistAstRoc**2);
          if (rockets[i].radius + asteroids[j].radius >= distanceAstRoc) {
            asteroids[j].hit = true;
            rockets[i].hit = true;
          } 
        for (let k = 0; k < saucers.length; k++) {
          let xDistSauRoc = Math.abs(rockets[i].xCoord - saucers[k].xCoord);
          let yDistSauRoc = Math.abs(rockets[i].yCoord - saucers[k].yCoord);
          let distanceSauRoc = Math.sqrt(xDistSauRoc**2 + yDistSauRoc**2);
          if (rockets[i].radius + saucers[k].radius >= distanceSauRoc) {
            saucers[k].hit = true;
            rockets[i].hit = true;
          }
        }
        }
      }
      return {
        rockets: rockets,
        asteroids: asteroids,
        saucers: saucers,
        ship: ship,
      };
    }

    let api = {
        checkCollisions: checkCollisions,
    };

    return api;
}());
