import Phaser from 'phaser';
import st2 from './assets/st2.png';
import door from './assets/doorst2.png';
import bt_back from './assets/bt_back.png';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/api';
import { doorCoordinates } from './functions/doorCoordinates';

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

  async onClickDoor(pointer)
  {
    const {downX, downY} = pointer;

    let idx = 0;
    for (const lim of doorCoordinates(2)) {
      if ((downX > lim.x[0] && downX < lim.x[1]) && (downY > lim.y[0] && downY < lim.y[1])) {
        this.scene.start('Stage2Inner', { quiz: await apiGetQuiz(2, idx) });
      }
      idx++;
    }
  }
}
