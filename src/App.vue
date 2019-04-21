<template>
  <div id="app">
    <div id='gameScreen-wrapper' class='gameScreen-wrapper'>
    <div id='gameScreen' class='gameScreen'>
      <canvas id='canvas' width="1500" height="1500" class='canvas'></canvas>
      <div class='hud'>
        <div>
          fuel : <span id='fuel'>20.00</span> s
        </div>
        <div>
          speed: <span id='speed'></span> m/s
        </div>
        <div>
          angle: <span id='angle'></span> rad
        </div>
      </div>
    </div>
    </div>
    <div id='title' class='menu-wrapper'>
      <div class='flex-around header'>
          <h1 >Galaga</h1>
      </div>
      <div id='menu' class='menu'>
        <div id='main-menu'> <div class='menu-item'>
            <input class="menu-button" type="button" value="New Game" onmouseover="MyGame.menuManager.mouseOver()" onclick="MyGame.menuManager.newGame();" />
          </div>
          <div class='menu-item'>
            <input class="menu-button" type="button" value="High Scores" onmouseover="MyGame.menuManager.mouseOver()" onclick="MyGame.menuManager.showHighScores();" />
          </div>
          <div class='menu-item'>
            <input class="menu-button" type="button" value="Controls" onmouseover="MyGame.menuManager.mouseOver()" onclick="MyGame.menuManager.showControls();" />
          </div>
          <div class='menu-item'>
            <input class="menu-button" type="button" value="Credits" onmouseover="MyGame.menuManager.mouseOver()" onclick="MyGame.menuManager.showCredits();" />
          </div>
        </div>
        <div id="credits" class='credits sub-menu'>
          <div class='menu-item'>
            <span class="menu-text">Made by Garrett Jennings</span>
          </div>
          <div class='menu-item'>
            <input class="menu-button" type="button" value="Back" onclick="MyGame.menuManager.showMenu();" />
          </div>
        </div>
        <div id="high-scores" class='high-scores sub-menu'>
          <div class='menu-item'>
            <span class="menu-text">Show High Scores</span>
          </div>
          <div class='menu-item'>
            <input class="menu-button" type="button" value="Back" onclick="MyGame.menuManager.showMenu();" />
          </div>
        </div>
        <div id="controls" class='controls sub-menu'>
          <div class='menu-item'>
            <span class="menu-text">Controls</span>
          </div>
            <input class="menu-button" type="button" value="Back" onclick="MyGame.menuManager.showMenu();" />
          <div class='menu-item'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
