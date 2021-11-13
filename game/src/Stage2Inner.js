import stage_inner2 from './assets/stage_inner2.png';
import button_stage_inner2 from './assets/button_stage_inner2.png';

import Phaser from 'phaser';
import { createNextQuestion, updateResponse } from './functions/quiz';
import countdown from './functions/countdown';
import { showLoader } from './functions/loaderControl';

export default class Stage2Inner extends Phaser.Scene
{
  constructor ()
  {
    super('Stage2Inner');
  }

  init (data)
  {
    this.data = data;
    this.quiz = data.quiz;

    this.result = true;
    this.current_question = 0;
    this.stage = 'stage_inner2';

    this.question_title_style = {
      fontSize: '50px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };

    this.option_text_style = {
      fontSize: '25px',
      color: 'white',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    showLoader(this);

    this.load.image('stage_inner2', stage_inner2);
    this.load.image('button_stage_inner2', button_stage_inner2);
    this.load.image(`img${this.quiz.nft.img}`, `/src/assets/nfts/${this.quiz.nft.img}.png`);
  }

  create ()
  {
    this.add.image(512, 350, 'stage_inner2');
    this.add.image(190, 500, `img${this.quiz.nft.img}`);
    const sound_click = this.sound.add('sound_click');

    const button_stage_inner_1 = this.add.image(512, 305, 'button_stage_inner2').setInteractive();
    const button_stage_inner_2 = this.add.image(512, 425, 'button_stage_inner2').setInteractive();
    const button_stage_inner_3 = this.add.image(512, 545, 'button_stage_inner2').setInteractive();

    countdown(this);

    button_stage_inner_1.on('pointerdown', (pointer) => {
      sound_click.play();
      updateResponse(this, 0);
    });

    button_stage_inner_2.on('pointerdown', (pointer) => {
      sound_click.play();
      updateResponse(this, 1);
    });

    button_stage_inner_3.on('pointerdown', (pointer) => {
      sound_click.play();
      updateResponse(this, 2);
    });

    createNextQuestion(this, 0);
  }
}
