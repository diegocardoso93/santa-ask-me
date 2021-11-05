import snowflakes from '../assets/snowflakes.png';
import snowflakes_large from '../assets/snowflakes_large.png';

export function preloadSnowflakes(ctx) {
  ctx.load.spritesheet('snowflakes', snowflakes, {frameWidth: 17});
  ctx.load.spritesheet('snowflakes_large', snowflakes_large, {frameWidth: 64});
}

export function createSnowflakeEmitter(ctx) {
  const snowflakes = ctx.add.particles('snowflakes');
  const snowflakes_large = ctx.add.particles('snowflakes_large');

  const lineZone = new Phaser.Geom.Line(0, 0, 1024, 2);
  
  const back_emitter = snowflakes.createEmitter({
    frames: [0, 1, 2, 3, 4, 5],
    x: 0,
    y: -32,
    lifespan: 100000,
    gravityY: 0,
    rotate: [0, 40],
    speedY: [20, 100],
    scale: { min: 0.2, max: 0.6 },
    frequency: 20,
    width: 1024 * 1.5,
    rotate: {min: 0, max: 40},
    emitZone: { type: 'random', source: lineZone} 
  });

  const mid_emitter = snowflakes.createEmitter({
    frames: [0, 1, 2, 3, 4, 5],
    x: 0,
    y: -32,
    lifespan: 100000,
    gravityY: 0,
    rotate: [0, 40],
    speedY: [50, 150],
    scale: { min: 0.8, max: 1.2 },
    frequency: 40,
    width: 1024 * 1.5,
    rotate: {min: 0, max: 40},
    emitZone: { type: 'random', source: lineZone}
  });

  const front_emitter = snowflakes_large.createEmitter({
    frames: [0, 1, 2, 3, 4, 5],
    x: 0,
    y: -32,
    lifespan: 100000,
    gravityY: 0,
    rotate: {min: 0, max: 40},
    speedY: [100, 200],
    scale: { min: 0.5, max: 1 },
    frequency: 1000,
    width: 1024 * 1.5,
    rotate: {min: 0, max: 40},
    emitZone: { type: 'random', source: lineZone}
  });

  back_emitter.start();
  mid_emitter.start();
  front_emitter.start();
}
