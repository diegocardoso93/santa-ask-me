import Phaser from 'phaser';
import st1 from './assets/st1.png';
import santa1 from './assets/santa1.png';
import santaface from './assets/santaface.png';
import door from './assets/door.png';

export default class Stage1 extends Phaser.Scene
{
  constructor ()
  {
      super('Stage1');
      this.countTimeHead = 0;
  }

  preload ()
  {
      this.load.image('st1', st1);
      this.load.image('santa1', santa1);
      this.load.image('santaface', santaface);
      this.load.image('door', door);
      // this.load.image('ipfs', 'https://bafkreiap4b7p34iorkv2qtgeen53ehntizzagnkq6ebz5gsaifm36rvhxe.ipfs.dweb.link');
  }

  create ()
  {
    const st1 = this.add.image(512, 350, 'st1');
    // const door = this.add.image(434, 554, 'door').setTint('0xffff00').setInteractive();
    const door = this.add.image(340, 494, 'door').setTint('0xffff00').setInteractive();
    const santa1 = this.add.image(770, 470, 'santa1');
    this.santaface = this.add.image(773, 420, 'santaface');
    this.santaface.setAngle(-16);
    this.label = this.add.text(630, 110, '', {
      fontSize: '30px',
      color: 'black',
      fontFamily: 'GROBOLD'
    }).setWordWrapWidth(300);
    this.typewriteText('Select one of the magic entrances and click to play! 🎅');

    // const ipfs = this.add.image(130, 130, 'ipfs');

    door.on('pointerdown', (pointer) => {
      console.log(pointer);
      const {downX, downY} = pointer;
      console.log(downX, downY);
      if ((downX > 264 && downX < 298) && (downY > 341 && downY < 378)) {
        // alert('port1');
        this.scene.start('Stage1Inner');
      } else if ((downX > 317 && downX < 365) && (downY > 336 && downY < 385)) {
        alert('port2');
      } else if ((downX > 383 && downX < 417) && (downY > 340 && downY < 377)) {
        alert('port3');
      } else if ((downX > 150 && downX < 179) && (downY > 472 && downY < 519)) {
        alert('port4');
      } else if ((downX > 215 && downX < 257) && (downY > 459 && downY < 502)) {
        alert('port5');
      } else if ((downX > 307 && downX < 379) && (downY > 413 && downY < 504)) {
        alert('port6');
      } else if ((downX > 422 && downX < 461) && (downY > 459 && downY < 501)) {
        alert('port7');
      } else if ((downX > 499 && downX < 529) && (downY > 473 && downY < 522)) {
        alert('port8');
      } else if ((downX > 136 && downX < 167) && (downY > 559 && downY < 596)) {
        alert('port9');
      } else if ((downX > 172 && downX < 205) && (downY > 558 && downY < 594)) {
        alert('port10');
      } else if ((downX > 218 && downX < 250) && (downY > 528 && downY < 563)) {
        alert('port11');
      } else if ((downX > 227 && downX < 250) && (downY > 576 && downY < 603)) {
        alert('port12');
      } else if ((downX > 266 && downX < 308) && (downY > 519 && downY < 563)) {
        alert('port13');
      } else if ((downX > 293 && downX < 388) && (downY > 542 && downY < 649)) {
        alert('port14');
      } else if ((downX > 369 && downX < 412) && (downY > 519 && downY < 564)) {
        alert('port15');
      } else if ((downX > 428 && downX < 459) && (downY > 530 && downY < 565)) {
        alert('port16');
      } else if ((downX > 427 && downX < 451) && (downY > 579 && downY < 608)) {
        alert('port17');
      } else if ((downX > 473 && downX < 507) && (downY > 560 && downY < 597)) {
        alert('port18');
      } else if ((downX > 511 && downX < 544) && (downY > 561 && downY < 596)) {
        alert('port19');
      }
    });

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: tween => {
        const value = tween.getValue();
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          Phaser.Display.Color.ValueToColor('#ffffff'),
          Phaser.Display.Color.ValueToColor('#33eeee'),
          100,
          value
        );
        const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
        door.setTint(color);
      }
    });
  }

  update(time, delta)
  {
    this.countTimeHead += delta;
    if (this.countTimeHead > 1500) {
        this.countTimeHead = 0;
        this.santaface.setVisible(!this.santaface.visible);
    }
  }

  typewriteText(text)
  {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
        callback: () => {
          this.label.text += text[i];
          ++i;
        },
        repeat: length - 1,
        delay: 50
    });
  }
}
