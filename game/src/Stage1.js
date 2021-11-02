import Phaser from 'phaser';
import st1 from './assets/st1.png';
import santa1 from './assets/santa1.png';
import santaface from './assets/santaface.png';
import door from './assets/door.png';
import bt_back from './assets/bt_back.png';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/mock';

export default class Stage1 extends Phaser.Scene
{
  constructor ()
  {
    super('Stage1');
  }

  init()
  {
    this.countTimeHead = 0;
    this.label_style = {
      fontSize: '30px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    this.load.image('st1', st1);
    this.load.image('santa1', santa1);
    this.load.image('santaface', santaface);
    this.load.image('door', door);
    this.load.image('bt_back', bt_back);
  }

  create ()
  {
    this.add.image(512, 350, 'st1');
    this.add.image(770, 470, 'santa1');
    const door = this.add.image(340, 494, 'door').setTint('0xffff00').setInteractive();
    const bt_back = this.add.image(100, 100, 'bt_back').setInteractive();
    this.santaface = this.add.image(773, 420, 'santaface');
    this.santaface.setAngle(-16);
    const label = this.add.text(630, 110, '', this.label_style).setWordWrapWidth(300);
    typewriteText(this, label, 'Select one of the magic entrances and click to play! 🎅');

    bt_back.on('pointerdown', (pointer) => {
      this.scene.start('SantaAskMe');
    });

    door.on('pointerdown', this.onClickDoor.bind(this));
    colorTween(this, door);
  }

  update(time, delta)
  {
    this.countTimeHead += delta;
    if (this.countTimeHead > 1500) {
        this.countTimeHead = 0;
        this.santaface.setVisible(!this.santaface.visible);
    }
  }

  async onClickDoor(pointer) {
    const {downX, downY} = pointer;
    if ((downX > 264 && downX < 298) && (downY > 341 && downY < 378)) {
      this.scene.start('Stage1Inner', { quiz: await apiGetQuiz(1, 0) });
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
  }
}
