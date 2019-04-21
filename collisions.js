MyGame.collisions = (function() {
    'use strict';
    function checkCollisions(rockets, ship, flies) {
      for (let j = 0; j < rockets.length; j++) {
        for (let k = 0; k < ship.length; k++) {
          let xDistRocketShip = Math.abs(ship[k].xCoord - rockets[j].xCoord);
          let yDistRocketShip = Math.abs(ship[k].yCoord - rockets[j].yCoord);
          let distanceRocketShip = Math.sqrt(xDistRocketShip**2 + yDistRocketShip**2);
          if (ship[k].radius + rockets[j].radius >= distanceRocketShip) {
            if (ship[k].immortal === false) {
              ship[k].hit = true;
            }
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
      for (let i = 0; i < flies.length; i++) {
        for (let k = 0; k < ship.length; k++) {
          let xDistShipFly = Math.abs(flies[i].xCoord - ship[k].xCoord);
          let yDistShipFly = Math.abs(flies[i].yCoord - ship[k].yCoord);
          let distanceShipFly = Math.sqrt(xDistShipFly**2 + yDistShipFly**2);
          if (flies[i].radius + ship[k].radius >= distanceShipFly) {
            flies[i].hit = true;
            ship[k].hit = true;
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
