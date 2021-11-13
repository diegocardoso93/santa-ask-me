import stage1 from './assets/stage1.png';
import santa1 from './assets/santa1.png';
import santa_face from './assets/santa_face.png';
import door_stage1 from './assets/door_stage1.png';
import button_back from './assets/button_back.png';

import Phaser from 'phaser';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/api';
import { doorCoordinates } from './functions/doorCoordinates';
import { createMagicFlaresEmitter, preloadFlares } from './functions/magicFlaresEmitter';
import { showLoader } from './functions/loaderControl';

export default class Stage1 extends Phaser.Scene
{
  constructor ()
  {
    super('Stage1');
  }

  init()
  {
    this.label_style = {
      fontSize: '30px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };
    this.santa_delay = 0;
  }

  preload ()
  {
    showLoader(this);

    this.load.image('stage1', stage1);
    this.load.image('santa1', santa1);
    this.load.image('santa_face', santa_face);
    this.load.image('door_stage1', door_stage1);
    this.load.image('button_back', button_back);
    preloadFlares(this);
  }

  create ()
  {
    this.add.image(512, 350, 'stage1');
    this.add.image(770, 470, 'santa1');
    this.sound_click = this.sound.add('sound_click');
    const door_stage1 = this.add.image(340, 494, 'door_stage1').setTint('0xffff00').setInteractive();
    const button_back = this.add.image(100, 100, 'button_back').setInteractive();
    this.santa_face = this.add.image(773, 420, 'santa_face');
    this.santa_face.setAngle(-16);
    const label = this.add.text(630, 110, '', this.label_style).setWordWrapWidth(300);
    typewriteText(this, label, 'Select one of the magic entrances and click to play! 🎅');

    button_back.on('pointerdown', (pointer) => {
      this.sound_click.play();
      this.scene.start('SantaAskMe');
    });

    door_stage1.on('pointerdown', this.onClickDoor.bind(this));
    colorTween(this, door_stage1);
    createMagicFlaresEmitter(this, door_stage1, 'door_stage1');
  }

  update(time, delta)
  {
    this.santa_delay += delta;
    if (this.santa_delay > 1500) {
      this.santa_delay = 0;
      this.santa_face.setVisible(!this.santa_face.visible);
    }
  }

  async onClickDoor(pointer)
  {
    const {downX, downY} = pointer;

    let idx = 0;
    for (const lim of doorCoordinates(1)) {
      if ((downX > lim.x[0] && downX < lim.x[1]) && (downY > lim.y[0] && downY < lim.y[1])) {
        this.sound_click.play();
        this.scene.start('Stage1Inner', { quiz: await apiGetQuiz(1, idx) });
      }
      idx++;
    }
  }
}
