MyGame.particles = (function (random) {
    let nextName = 1;
    let particleList = {};
    let spec;

    function init (spec) {
      this.spec = spec;
    }

    function create() {
        let size = random.nextGaussian(this.spec.size.mean, this.spec.size.stdev);
        let particle = {
            center: { x: this.spec.center.x, y: this.spec.center.y },
            size: { x: size, y: size },
            direction: random.nextCircleVector(),
            speed: random.nextGaussian(this.spec.speed.mean, this.spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: random.nextGaussian(this.spec.lifetime.mean, this.spec.lifetime.stdev), // seconds
            alive: 0
        };
        particleList[nextName++] = particle;
        return particle;
    }

    function getParticlesSpecs() {
      let particlesSpecs = [];
      for (let particle in this.particleList) {
        let particleSpecs = {
        center: {x: this.particleList[particle].center.x, y: this.particleList[particle].center.y},
        width: 10,
        height: 10,
        rotation: particle.rotation,
      };
        particlesSpecs.push(particleSpecs);
      }
      return {
               specList: particlesSpecs,
               imageSrc: 'resources/laser.png',
             };
    }

    function update(elapsedTime) {
        let removeMe = [];

        elapsedTime = elapsedTime / 1000;

        for (let particle = 0; particle < 2; particle++) {
            particleList[nextName++] = this.create();
        }

        Object.getOwnPropertyNames(particleList).forEach(value => {
            let particle = particleList[value];

            particle.alive += elapsedTime;
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            particle.rotation += particle.speed / 500;

            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particleList[removeMe[particle]];
        }
    }

    function getParticleSpec() {
      let particleSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
      };
      return particleSpecTexture;
    }

    let api = {
        update: update,
        init: init,
        create: create,
        getParticlesSpecs: getParticlesSpecs,
        get particleList() { return particleList; }
    };

    Object.defineProperty(api, 'particleList', {
        value: particleList,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'spec', {
        value: spec,
        writable: true,
        enumerable: true,
        configurable: false
    });


    return api;
}(MyGame.random));
