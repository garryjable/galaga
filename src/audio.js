MyGame.audio = (function() {
    'use strict';
    let sounds = {};

    function loadSound(source, label, idButton) {
        let sound = new Audio();
        sound.addEventListener('canplay', function() {
        });
        sound.addEventListener('play', function() {
        });
        sound.addEventListener('pause', function() {
        });
        sound.addEventListener('canplaythrough', function() {
        });
        sound.addEventListener('progress', function() {
        });
        sound.addEventListener('timeupdate', function() {
        });
        sound.src = source;
        return sound;
    }

    function loadAudio() {
        sounds['resources/asteroid-break'] = loadSound('resources/asteroid-break.flac', 'Asteroid Break', 'id-asteroidBreak');
        sounds['resources/alien-death'] = loadSound('resources/alien-death.flac', 'Alien Death', 'id-alienDeath');
        sounds['resources/laser'] = loadSound('resources/laser.ogg', 'Laser', 'id-laser');
        sounds['resources/rocket'] = loadSound('resources/rocket.ogg', 'Rocket', 'id-rocket');
        sounds['resources/hyperspace'] = loadSound('resources/hyperspace.wav', 'Hyperspace', 'id-hyperspace');
        sounds['resources/ship-death'] = loadSound('resources/ship-death.flac', 'Ship Death', 'id-shipDeath');
        sounds['resources/sound-alien'] = loadSound('resources/sound-alien.ogg', 'Sound Alien', 'id-soundAlien');
        sounds['resources/thruster'] = loadSound('resources/thruster.mp3', 'Thruster', 'id-thruster');
        sounds['resources/menu-beep'] = loadSound('resources/menu-beep.wav', 'Menu Beep', 'id-menuBeep');
        sounds['resources/comptroller-crossover-dragon'] = loadSound('resources/comptroller-crossover-dragon.mp3', 'Crossover Dragon', 'id-crossoverDragon');
        sounds['resources/comptroller-bad-ice'] = loadSound('resources/comptroller-bad-ice.mp3', 'Bad Ice', 'id-badice');
        sounds['resources/comptroller-exapno-mapcase'] = loadSound('resources/comptroller-exapno-mapcase.mp3', 'Exapno Mapcase', 'id-exapnoMapcase');
        sounds['resources/comptroller-low-point'] = loadSound('resources/comptroller-low-point.mp3', 'Low Point', 'id-lowPoint');
        sounds['resources/comptroller-monks'] = loadSound('resources/comptroller-monks.mp3', 'Monks', 'id-monks');
        sounds['resources/comptroller-nonono'] = loadSound('resources/comptroller-nonono.mp3', 'Nonono', 'id-nonono');
        sounds['resources/comptroller-open'] = loadSound('resources/comptroller-open.mp3', 'Open', 'id-open');
        sounds['resources/comptroller-red-room'] = loadSound('resources/comptroller-red-room.mp3', 'Red Room', 'id-redRoom');
        sounds['resources/comptroller-tile-giant'] = loadSound('resources/comptroller-tile-giant.mp3', 'Tile Giant', 'id-tileGiant');
        sounds['resources/comptroller-white-knighting'] = loadSound('resources/comptroller-white-knighting.mp3', 'White Knighting', 'id-whiteKnighting');
    }

    loadAudio();

    //------------------------------------------------------------------
    //
    // Pauses the specified audio
    //
    //------------------------------------------------------------------
    function pauseSound(whichSound) {
        sounds[whichSound].pause();
    }

    //------------------------------------------------------------------
    //
    // Plays the specified audio
    //
    //------------------------------------------------------------------
    function playSound(whichSound) {
      sounds[whichSound].play();
    }

    function playFireSound() {
      return
    }

    let api = {
        playFireSound: playFireSound,
        playSound: playSound,
        pauseSound: pauseSound,
    };

    Object.defineProperty(api, 'sounds', {
        value: sounds,
        writable: true,
        enumerable: true,
        configurable: false
    });



    return api;
}());
