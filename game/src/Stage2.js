import stage2 from './assets/stage2.png';
import door_stage2 from './assets/door_stage2.png';
import button_back from './assets/button_back.png';

import Phaser from 'phaser';
import colorTween from './functions/colorTween';
import typewriteText from './functions/typewriteText';
import { apiGetQuiz } from './functions/api';
import { doorCoordinates } from './functions/doorCoordinates';
import { createMagicFlaresEmitter, preloadFlares } from './functions/magicFlaresEmitter';
import { showLoader } from './functions/loaderControl';

export default class Stage2 extends Phaser.Scene
{
  constructor ()
  {
    super('Stage2');
  }

  init ()
  {
    this.text_style = {
      fontSize: '30px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    showLoader(this);

    this.load.image('stage2', stage2);
    this.load.image('door_stage2', door_stage2);
    this.load.image('button_back', button_back);
    preloadFlares(this);
  }

  create ()
  {
    this.add.image(512, 350, 'stage2');
    this.sound_click = this.sound.add('sound_click');
    const door_stage2 = this.add.image(354, 365, 'door_stage2').setTint('0xffff00').setInteractive();
    const button_back = this.add.image(100, 100, 'button_back').setInteractive();
    const text = this.add.text(630, 110, '', this.text_style).setWordWrapWidth(300);

    button_back.on('pointerdown', (pointer) => {
      this.sound_click.play();
      this.scene.start('SantaAskMe');
    });

    door_stage2.on('pointerdown', this.onClickDoor.bind(this));

    typewriteText(this, text, 'Select one of the magic entrances and click to play! 🎅');
    colorTween(this, door_stage2, 1000, '#ffffff', '#eeee33');
    createMagicFlaresEmitter(this, door_stage2, 'door_stage2');
  }

  async onClickDoor(pointer)
  {
    const {downX, downY} = pointer;

    let idx = 0;
    for (const lim of doorCoordinates(2)) {
      if ((downX > lim.x[0] && downX < lim.x[1]) && (downY > lim.y[0] && downY < lim.y[1])) {
        this.sound_click.play();
        this.scene.start('Stage2Inner', { quiz: await apiGetQuiz(2, idx) });
      }
      idx++;
    }
  }
}
