import Phaser from 'phaser';
import st2 from './assets/st2.png';
import door from './assets/doorst2.png';
import bt_back from './assets/bt_back.png';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/mock';

export default class Stage2 extends Phaser.Scene
{
  constructor ()
  {
    super('Stage2');
  }

  init ()
  {
    this.label_style = {
      fontSize: '30px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    this.load.image('st2', st2);
    this.load.image('doorst2', door);
    this.load.image('bt_back', bt_back);
  }

  create ()
  {
    this.add.image(512, 350, 'st2');
    const door = this.add.image(354, 365, 'doorst2').setTint('0xffff00').setInteractive();
    const bt_back = this.add.image(100, 100, 'bt_back').setInteractive();

    const label = this.add.text(630, 110, '', this.label_style).setWordWrapWidth(300);

    bt_back.on('pointerdown', (pointer) => {
      this.scene.start('SantaAskMe');
    });

    door.on('pointerdown', this.onClickDoor.bind(this));

    typewriteText(this, label, 'Select one of the magic entrances and click to play! 🎅');

    colorTween(this, door, 1000, '#ffffff', '#eeee33');
  }

  async onClickDoor(pointer) {
    const {downX, downY} = pointer;
    if ((downX > 190  && downX < 215 ) && (downY > 203 && downY < 229)) {
      this.scene.start('Stage2Inner', { quiz: await apiGetQuiz(2, 0) });
    } else if ((downX > 275 && downX < 313) && (downY > 205 && downY < 246)) {
      alert('port2');
    } else if ((downX > 335 && downX < 375) && (downY > 201 && downY < 245)) {
      alert('port3');
    } else if ((downX > 397 && downX < 434) && (downY > 203 && downY < 246)) {
      alert('port4');
    } else if ((downX > 492 && downX < 519) && (downY > 201 && downY < 230)) {
      alert('port5');
    } else if ((downX > 128 && downX < 161) && (downY > 296 && downY < 335)) {
      alert('port6');
    } else if ((downX > 189 && downX < 227) && (downY > 269 && downY < 314)) {
      alert('port7');
    } else if ((downX > 249 && downX < 305) && (downY > 319 && downY < 383)) {
      alert('port8');
    } else if ((downX > 326 && downX < 383) && (downY > 313 && downY < 379)) {
      alert('port9');
    } else if ((downX > 405 && downX < 461) && (downY > 322 && downY < 382)) {
      alert('port10');
    } else if ((downX > 476 && downX < 519) && (downY > 267 && downY < 313)) {
      alert('port11');
    } else if ((downX > 546 && downX < 580) && (downY > 298 && downY < 336)) {
      alert('port12');
    } else if ((downX > 133 && downX < 184) && (downY > 388 && downY < 446)) {
      alert('port13');
    } else if ((downX > 150 && downX < 179) && (downY > 452 && downY < 485)) {
      alert('port14');
    } else if ((downX > 220 && downX < 273) && (downY > 449 && downY < 509)) {
      alert('port15');
    } else if ((downX > 316 && downX < 394) && (downY > 434 && downY < 528)) {
      alert('port16');
    } else if ((downX > 436 && downX < 490) && (downY > 455 && downY < 510)) {
      alert('port17');
    } else if ((downX > 527 && downX < 575) && (downY > 387 && downY < 443)) {
      alert('port18');
    } else if ((downX > 529 && downX < 558) && (downY > 450 && downY < 486)) {
      alert('port19');
    }
  }
}
