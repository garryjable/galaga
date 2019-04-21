MyGame.menuManager = (function(audio) {
  'use strict';

  function newGame() {
    audio.playSound('resources/comptroller-crossover-dragon');
    audio.playSound('resources/hyperspace');
    let title = document.getElementById('title');
    title.style.display = 'none';
    let gameScreen = document.getElementById('gameScreen-wrapper');
    gameScreen.style.display = 'flex';
  }

  function showHighScores() {
    let menu = document.getElementById('main-menu');
    menu.style.display = 'none';
    let highScores = document.getElementById('high-scores');
    highScores.style.display = 'block';
  }

  function showControls() {
    let menu = document.getElementById('main-menu');
    menu.style.display = 'none';
    let options = document.getElementById('controls');
    options.style.display = 'block';
  }

  function showCredits() {
    let menu = document.getElementById('main-menu');
    menu.style.display = 'none';
    let credits = document.getElementById('credits');
    credits.style.display = 'block';
  }

  function showMenu() {
    let menu = document.getElementById('main-menu');
    menu.style.display = 'block';
    let credits = document.getElementById('credits');
    credits.style.display = 'none';
    let options = document.getElementById('controls');
    options.style.display = 'none';
    let highScores = document.getElementById('high-scores');
    highScores.style.display = 'none';
  }

  function mouseOver() {
    audio.playSound('resources/menu-beep');
  }

  let api = {
    newGame: newGame,
    showHighScores: showHighScores,
    showControls: showControls,
    showCredits: showCredits,
    showMenu: showMenu,
    mouseOver: mouseOver,
  };

  return api;

}(MyGame.audio));
