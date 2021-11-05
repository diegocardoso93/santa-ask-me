
import flares from '../assets/flares.png';
import flares_behav from '../assets/flares.json';

export function preloadFlares(ctx) {
  ctx.load.atlas('flares', flares, flares_behav);
}

export function createMagicFlaresEmitter(ctx, object, texture) {

  const origin = object.getTopLeft();
  const particles = ctx.add.particles('flares');

  let x, y, pixel;
  particles.createEmitter({
    x: 0,
    y: 0,
    lifespan: 1000,
    gravityY: 10,
    scale: {start: 0, end: 0.2, ease: 'Quad.easeOut'},
    alpha: {start: 1, end: 0, ease: 'Quad.easeIn'},
    blendMode: 'ADD',
    emitZone: {type: 'random', source: {
      getRandomPoint: (vec) => {
        do {
          x = Phaser.Math.Between(0, object.width - 1);
          y = Phaser.Math.Between(0, object.height - 1);
          pixel = ctx.textures.getPixel(x, y, texture);
        } while (pixel.alpha < 255);
  
        return vec.setTo(x + origin.x, y + origin.y);
      }
    }}
  });
}
