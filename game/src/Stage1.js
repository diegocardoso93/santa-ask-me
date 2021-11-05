import Phaser from 'phaser';
import st1 from './assets/st1.png';
import santa1 from './assets/santa1.png';
import santaface from './assets/santaface.png';
import door from './assets/door.png';
import bt_back from './assets/bt_back.png';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/api';
import { doorCoordinates } from './functions/doorCoordinates';

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

  async onClickDoor(pointer)
  {
    const {downX, downY} = pointer;

    let idx = 0;
    for (const lim of doorCoordinates(1)) {
      if ((downX > lim.x[0] && downX < lim.x[1]) && (downY > lim.y[0] && downY < lim.y[1])) {
        this.scene.start('Stage1Inner', { quiz: await apiGetQuiz(1, idx) });
      }
      idx++;
    }
  }
}
